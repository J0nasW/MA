import { Model } from 'sequelize';

export class Container extends Model {
	public id!: number; // Note that the `null assertion` `!` is required in strict mode.
	public name!: string;
    public address!: string;
    public passphrase!: string;

	public departure_location?: string; // for nullable fields
    public arrival_location?: string;
	public departure_time?: string;
    public arrival_time?: string; 

	public cargo!: string;
	public cargo_properties?: string;
}
