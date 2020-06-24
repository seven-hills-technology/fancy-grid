export interface FilterableColumnDefinition {
    name: string;
    title: string;
    filterStyle: "inline" | "popup";
    fieldType: FieldType;
}

export type FieldType = "text" | "number" | "date" | "datetime" | "boolean" | "yesNo";