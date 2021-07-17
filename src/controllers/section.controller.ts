import { Request, Response } from 'express';
import { getRepository, QueryRunner } from 'typeorm';
import { connectdb } from '../config/db.config';
import { Section } from '../models/section.model';
import { User } from '../models/user.model';
import lodash from 'lodash';
import moment from 'moment';
import fs from 'fs';
import csv from 'csv-parser';
import { ImportSectionDTO } from '../dto/import-section.dto';
import { validateSync } from 'class-validator';
import { transformError } from '../utils/validator';

async function getSectionList(req: Request, res: Response): Promise<void> {
  try {
    const sectionRepository = getRepository(Section);
    const sections = await sectionRepository
      .createQueryBuilder('section')
      .leftJoinAndMapMany(
        'section.leader',
        User,
        'user',
        'section.leaderId = user.id',
      )
      .orderBy({ 'section.id': 'ASC' })
      .withDeleted()
      .getMany();
    res.render('section/sectionList', {
      title: 'Section List',
      sections,
      _: lodash,
      moment: moment,
      session: req.session,
      alerts: req.session!.alert || [],
    });
  } catch (error) {
    res.render('section/sectionList', {
      title: 'Section List',
      sections: [],
      moment: moment,
      _: lodash,
      session: req.session,
      alerts: req.session!.alert || [],
    });
  }
}

async function importCSV(req: Request, res: Response): Promise<void> {
  const csvData: Record<string, string | number>[] = [];
  const errorList: string[] = [];
  const queryRunner: QueryRunner = (await connectdb).createQueryRunner();
  await queryRunner.startTransaction();
  fs.createReadStream(<string>req.file?.filename)
    .pipe(
      csv({
        mapHeaders: ({ header }) => {
          switch (header) {
            case 'ID':
              return 'id';
            case 'Section Name':
              return 'name';
            case 'Remarks':
              return 'remarks';
            case 'Leader ID':
              return 'leaderId';
            case 'Leader Name':
              return 'leaderName';
            case 'Floor Number':
              return 'floorNum';
            case 'Delete':
              return 'delete';
            default:
              return '';
          }
        },
      }),
    )
    .on('data', (data) => csvData.push(data))
    .on('end', async () => {
      fs.unlinkSync(<string>req.file?.filename);
      try {
        for (const index in csvData) {
          csvData[index].leaderId = +csvData[index].leaderId;
          csvData[index].floorNum = +csvData[index].floorNum;
          if (csvData[index].id !== '') {
            const section = await getRepository(Section).findOne(
              csvData[index].id,
            );
            if (!section) {
              errorList.push(`${index + 2}行目 : Id not exists`);
            } else {
              if (
                (<string>csvData[index].delete)?.trim().toLowerCase() === 'y'
              ) {
                await queryRunner.manager.update(Section, csvData[index].id, {
                  deletedAt: new Date(),
                });
              } else {
                const reqUpdateSection = new ImportSectionDTO(
                  (<unknown>csvData[index]) as ImportSectionDTO,
                );
                const error = validateSync(reqUpdateSection);
                if (error.length > 0) {
                  const errorResults = transformError(error).map(
                    (item) => `${+index + 2}行目 : ${item}`,
                  );
                  errorList.push(...errorResults);
                } else {
                  await queryRunner.manager.update(
                    Section,
                    +csvData[index].id,
                    reqUpdateSection,
                  );
                }
              }
            }
          } else {
            const reqAddSection = new ImportSectionDTO(
              (<unknown>csvData[index]) as ImportSectionDTO,
            );
            const error = validateSync(reqAddSection);
            if (error.length > 0) {
              const errorResults = transformError(error).map(
                (item) => `${+index + 2}行目 : ${item}`,
              );
              errorList.push(...errorResults);
            } else {
              await queryRunner.manager.save(Section, reqAddSection);
            }
          }
        }
      } finally {
        if (errorList.length > 0) {
          req.session!.alert = errorList;
          await queryRunner.rollbackTransaction();
          return res.redirect('back');
        } else await queryRunner.commitTransaction();
        await queryRunner.release();
      }
      return res.redirect('back');
    });
}

export { getSectionList, importCSV };
