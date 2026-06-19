import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialCreate1781876250197 implements MigrationInterface {
    name = 'InitialCreate1781876250197'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "bookings" ("id" SERIAL NOT NULL, "bookerName" character varying NOT NULL, "bookingDate" date NOT NULL, "room_id" integer, CONSTRAINT "PK_bee6805982cc1e248e94ce94957" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rooms" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "capacity" integer NOT NULL, CONSTRAINT "PK_0368a2d7c215f2d0458a54933f2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD CONSTRAINT "FK_0b0fc32fe6bd0119e281628df7a" FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bookings" DROP CONSTRAINT "FK_0b0fc32fe6bd0119e281628df7a"`);
        await queryRunner.query(`DROP TABLE "rooms"`);
        await queryRunner.query(`DROP TABLE "bookings"`);
    }

}
