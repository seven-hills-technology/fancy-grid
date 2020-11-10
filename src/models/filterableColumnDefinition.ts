import { FilterType } from "./filterType";

export interface FilterableColumnDefinition {
    name: string;
    title: string;
    filterStyle: "inline" | "popup";
    fieldType: FieldType;
    whiteList?: FilterType[]
    dropdownOptions: string[];
}

export type FieldType = "text" | "number" | "date" | "boolean" | "yesNo" | "dropdown";