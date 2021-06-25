import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 } from "uuid";
import { typeTransaction } from "../types/TransactioType";
import { User } from "./Users.model";

@Entity("transactions")
export class Transactions extends BaseEntity {

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
    user_id: string;

    @Column({
        type: 'varchar'
    })
    type_transaction: typeTransaction;

    @Column({
        type: 'float'
    })
    amount: number;

    @CreateDateColumn()
    created_at?: Date;

    @ManyToOne(() => User, user => user.transactions, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: "user_id" })
    user: User;

    // @OneToMany(() => TransactionsGroup, TransactionsGroup => TransactionsGroup.Transactions, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    // Transactions_groups: TransactionsGroup[];
}