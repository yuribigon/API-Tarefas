import { MigrationInterface, QueryRunner, Table, TableColumn } from "typeorm"

export class CreateUserTable1685280044155 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'users',
                columns: [
                    new TableColumn({ name: 'user_id', type: 'varchar', isPrimary: true }),
                    new TableColumn({ name: 'user_name', type: 'varchar' }),
                    new TableColumn({ name: 'user_email', type: 'varchar', isUnique: true }),
                    new TableColumn({ name: 'user_password', type: 'varchar', }),
                ]
            })
        )

        await queryRunner.createTable(
            new Table({
              name: 'tasks',
              columns: [
                new TableColumn({ name: 'task_id', type: 'varchar', isPrimary: true }),
                new TableColumn({ name: 'task_title', type: 'varchar' }),
                new TableColumn({ name: 'task_description', type: 'varchar' }),
                new TableColumn({ name: 'task_status_active', default: true, type: 'bool' }),
                new TableColumn({ name: 'task_created_at', type: 'varchar' }),
                new TableColumn({ name: 'task_updated_at', type: 'varchar' }),
                new TableColumn({ name: 'task_user_id', type: 'varchar' }),
              ],
              foreignKeys: [
                {
                  columnNames: ['task_user_id'],
                  referencedTableName: 'users',
                  referencedColumnNames: ['user_id'],
                },
              ]
            })
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
        await queryRunner.dropTable('tasks');
    }

}
