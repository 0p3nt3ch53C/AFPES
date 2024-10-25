
import * as xlsx from "@mirror/xlsx";

// Change Variables to fit:
const XLSXFilePath = "/home/vagrant/Downloads/AfP_EirenePeacebuildingDatabase_2.2020.xlsx"

// Interesting --allow-hrtime

/*
const Check_Items = [
    "Existence and frequency of interaction between groups",
    "Gender Equality",
    "Integration of marginalized groups",
    "Knowledge of Social Cohesion",
    "Level of discrimination",
    "Attitudes towards peace and reconciliation processes",
    "Community perceptions of youth",
    "Economic cohesion",
    "Engagement in community",
]
*/

const Check_Items = [
    "% who perceive trust or lack thereof within their neighborhood",
"Attitudes towards diversity and pluralism",
"Attitudes towards inter-group interaction",
"Attitudes towards peace and reconciliation processes",
"Community perceptions of youth",
"Economic cohesion",
"Engagement in community",
"Existence and frequency of interaction between groups",
"Gender Equality",
"Integration of marginalized groups",
"Knowledge of Social Cohesion",
"Level of discrimination",
"Level of discrimination (Human rights)",
"Level of diversity",
"Level of responsibility felt for community",
"Level of tension/conflict between groups",
"Perceived self-efficacy to impact positive change in community",
"Perceptions of other groups",
"Progress on peace and reconciliation processes",
"Quality of multi-group projects/initiatives",
"Quality of relationship between groups",
"Quality of relationship between groups (Empathy)",
"Quality of relationship between groups (Trust)",
"Quantity of multi-group projects/initiatives",
"Reintegration of ex-combatants",
"Religious Tolerance",
"Socio-Economic Equality",
"Socio-Economic Equality (Capacity Development)",
"Socio-Economic Equality (Employment)",
"Socio-Economic Equality (Marginalized groups)",
"Strength of identity",
"Strength of network across communities",
"Strength of network within communities",
"Willingness to Reconcile",
"Youth Engagement",
"% who perceive trust or lack thereof within their neighborhood",
"Attitudes towards inter-group interaction (Trust)",
"Community perceptions of youth (Trust)",
"Community-Security forces relations (Trust)",
"Existence and frequency of interaction between groups (Trust)",
"Level of general trust",
"Level of institutional/political trust",
"Perceptions of other groups (Trust)",
"Quality of relationship between groups (Trust)",
"Rule of Law (Confidence in Justice System)",
"Trust and confidence in conflict resolving mechanisms",
"Trust in government institutions"
]

const Base_Excel_File = await Deno.readFile(XLSXFilePath);
const Base_Excel_File_Content = xlsx.read(Base_Excel_File);
const Database_Worksheet_Array = xlsx.utils.sheet_to_row_object_array(Base_Excel_File_Content['Sheets']['Database']);
const Sources_Worksheet = Base_Excel_File_Content['Sheets']['Sources'];
const Sources_Worksheet_Array = xlsx.utils.sheet_to_row_object_array(Sources_Worksheet);

function Find_Source_Link (Sources: any, Sources_Array: any, Id: number){
    for (let Sources_Row = 0; Sources_Row < (Sources_Array.length + 1); Sources_Row++ ){
        try{
            if (Sources_Array[Sources_Row]["#"] == Id ){
                const Cell = "A" + (Sources_Array[Sources_Row].__rowNum__ + 1);
                return Sources[`${Cell}`].l.Target;
            }
        } catch {
            console.log("Found error on (Sources):")
            console.log("Row " + Sources_Row + " Data:" + Sources_Array[Sources_Row])
        }
    }
}

function Find_In_Worksheets (Database_Array: any, Sources: any, Sources_Array: any, Query: string){
    const Worksheet_Data = {};
    const Report_ID_Array = [];
    for (let Database_Row = 0; Database_Row < (Database_Array.length + 1); Database_Row++ ){
        try {
            if ((Database_Array[Database_Row]["Area Sub-Group"]).includes(Query)){
                const Report_ID = String(Database_Array[Database_Row]["#"]);
                if (!Report_ID_Array.includes(Report_ID)){
                    Worksheet_Data[Report_ID] = {
                        "Title": (Database_Array[Database_Row]["Title"]).replace(/,/g, ""),
                        "Country": (Database_Array[Database_Row]["Country"]).replace(/,/g, ""),
                        "Date Published": Database_Array[Database_Row]["Date Published"],
                        "Indicators": []
                    };
                    Worksheet_Data[Report_ID]["Indicators"].push((Database_Array[Database_Row]["Indicator"]).replace(/,/g, ""));
                    const Source_Link = Find_Source_Link(Sources, Sources_Array, Database_Array[Database_Row]["#"]);
                    Worksheet_Data[Report_ID]["Link"] = Source_Link;
                    Report_ID_Array.push(Report_ID)
                }else{
                    try{
                        if ( !Worksheet_Data[Report_ID]["Indicators"].includes((Database_Array[Database_Row]["Indicator"]).replace(/,/g, "")) ){
                            Worksheet_Data[Report_ID]["Indicators"].push((Database_Array[Database_Row]["Indicator"]).replace(/,/g, ""));
                        }
                    }catch{
                        console.log();
                    }
                }
            }
        } catch {
            console.log("Found error on (Database Worksheets):")
            console.log("Row " + Database_Row + " Data:" + Database_Array[Database_Row])
        }
    }
    return Worksheet_Data;
}

const Results = [];

for (const Item of Check_Items){ 
    const Item_Results = Find_In_Worksheets(Database_Worksheet_Array, Sources_Worksheet, Sources_Worksheet_Array, Item)
    Results[Item] = Item_Results;
}
console.log(Results);

// Write to CSV File.
const Current_Date = new Date();
const Timestamp = [ + ("0" + Current_Date.getDate()).slice(-2) + "" + ("0" + (Current_Date.getMonth() + 1)).slice(-2) + "" + Current_Date.getFullYear() + " " + Current_Date.getHours() + ":" + Current_Date.getMinutes() + ":" + Current_Date.getSeconds() ];
let Results_Written_To_CSV = 0;
// let Results_CSV_File = {};
const Results_CSV_Filename = ( "/home/vagrant/Desktop/" + "Eirene Peacebuilding Database Subgroups " + Timestamp + ".csv")
const Results_CSV_File = await Deno.create(Results_CSV_Filename);
const Field_Separator = ",";
Deno.writeTextFile(Results_CSV_Filename, "Subgroup" + Field_Separator + "Title" + Field_Separator + "Indicators" + Field_Separator + "Link" + Field_Separator + "Report ID" + Field_Separator + "Country" + Field_Separator + "Date Published\n", {append: true});
// console.log("Subgroup|Title|Indicator|Link|Report ID|Country|Date Published")
for (let Query in Results){
    for (let Report_ID in Results[Query]){
        const Indicators = Results[Query][Report_ID]["Indicators"].length;
        for (let Indicator_Number = 0; Indicator_Number < Indicators; Indicator_Number++ ){
            // console.log( Query + "|" + Results[Query][Report_ID]["Title"] + "|" + Results[Query][Report_ID]["Indicators"] + "|" + Results[Query][Report_ID]["Link"] + "|" + Report_ID + "|" + Results[Query][Report_ID]["Country"] + "|" + Results[Query][Report_ID]["Date Published"] );
            let Result = String( Query + Field_Separator + (Results[Query][Report_ID]["Title"]).replace(/\n|\r/g, "") + Field_Separator + (Results[Query][Report_ID]["Indicators"][Indicator_Number]).replace(/\n|\r/g, "") + Field_Separator + Results[Query][Report_ID]["Link"] + Field_Separator + Report_ID + Field_Separator + Results[Query][Report_ID]["Country"] + Field_Separator + Results[Query][Report_ID]["Date Published"] + "\n" );
            Deno.writeTextFile(Results_CSV_Filename, Result, {append: true});
            Results_Written_To_CSV += 1;
            // console.log( <SUBGROUP> + "|" + <TITLE> + "|" + <INDICATOR> + "|" + <LINK> + "|" + <REPORT ID> + "|" + <COUNTRY> + "|" + <DATE PUBLISHED> )
        }
    }
}

console.log("Successfully wrote " + Results_Written_To_CSV + " results to CSV file: " + Results_CSV_Filename);
// Run with:
// deno run --allow-write=/home/vagrant/Desktop/ --allow-read=/home/vagrant/Desktop/ --allow-read=/home/vagrant/Downloads/ afp.ts
