import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { v4 } from "uuid";
import { Transactions } from "./transactions.model";

@Entity("users")
export class User extends BaseEntity {

    constructor() {
        super()
        if (!this.id) {
            this.id = v4();
        }
    }

    @PrimaryColumn({
        primary: true
    })
    id: string;

    @Column({
        type: 'varchar'
    })
    name: string;

    @Column({
        type: 'varchar',
        unique: true
    })
    email: string;

    @Column({
        type: 'varchar'
    })
    password?: string;

    @Column({
        type: 'float',
        default: 0
    })
    balance: number;

    @Column({
        type: 'varchar',
        nullable: true
    })
    default_currency: string;

    @CreateDateColumn()
    created_at?: Date;

    @OneToMany(() => Transactions, transaction => transaction.user)
    transactions?: Transactions[];

    // @OneToMany(() => UserGroup, userGroup => userGroup.user, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    // user_groups: UserGroup[];
}