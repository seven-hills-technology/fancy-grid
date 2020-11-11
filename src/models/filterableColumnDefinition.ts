import { DropdownOptionsDefinition } from "./dropdownOptionsDefinition";
import { FilterType } from "./filterType";

export interface FilterableColumnDefinition {
    name: string;
    title: string;
    filterStyle: "inline" | "popup";
    fieldType: FieldType;
    whiteList?: FilterType[]
    dropdownOptions: DropdownOptionsDefinition[];
}

export type FieldType = "text" | "number" | "date" | "boolean" | "yesNo" | "dropdown";