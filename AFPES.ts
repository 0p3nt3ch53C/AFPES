console.log(
  "Starting Alliance For Peacebuilding - Eirene Simplification application.",
);

console.log("[1/4] Importing code libraries for use.");
import * as xlsx from "@mirror/xlsx";
import { parseArgs } from "jsr:@std/cli/parse-args";
console.log("[1/4] Sucessfully imported code libraries for use.");

console.log("[2/4] Parsing code arguments and creating file names for use.");
const Current_Date = new Date();
const Timestamp = [
  +("0" + (Current_Date.getMonth() + 1)).slice(-2) + "-" +
  ("0" + Current_Date.getDate()).slice(-2) + "-" + Current_Date.getFullYear() +
  " " + Current_Date.getHours() + "" + Current_Date.getMinutes() + "" +
  Current_Date.getSeconds(),
];
const Results_CSV_Filename = 
  "Eirene Peacebuilding Database Subgroups " + Timestamp + ".csv";

const args = parseArgs(Deno.args, {
  boolean: ["help", "debug"],
  string: ["AFPE", "Export"],
  default: { AFPE: ".\\EAFP.xlsx", Export: Results_CSV_Filename },
});

async function Check_If_File_Exists(FilePath: string) {
  try {
    await Deno.lstat(FilePath);
  } catch (FileError) {
    if (!(FileError instanceof Deno.errors.NotFound)) {
      throw FileError;
    }
    if (args.debug) {
      console.log(FileError);
    }
  }
}

Check_If_File_Exists(args.AFPE);
Check_If_File_Exists(args.Export);
console.log(
  "[2/4] Completed parsing code arguments and creating file names for use. Using based AFP Eirene Excel file:" +
    args.AFPE + " and export file: " + args.Export,
);

console.log("[3/4] Processing logic against Excel file: " + args.AFPE);
const XLSXFilePath = args.AFPE;

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
  "Trust in government institutions",
];

const Base_Excel_File = await Deno.readFile(XLSXFilePath);
const Base_Excel_File_Content = xlsx.read(Base_Excel_File);
const Database_Worksheet_Array: Array<string> = xlsx.utils.sheet_to_json(
  Base_Excel_File_Content["Sheets"]["Database"],
);
const Sources_Worksheet = Base_Excel_File_Content["Sheets"]["Sources"];
const Sources_Worksheet_Array: Array<string> = xlsx.utils.sheet_to_json(
  Sources_Worksheet,
);

function Find_Source_Link(Sources: any, Sources_Array: any, Id: number) {
  for (
    let Sources_Row = 0;
    Sources_Row < (Sources_Array.length + 1);
    Sources_Row++
  ) {
    try {
      if (Sources_Array[Sources_Row]["#"] == Id) {
        const Cell = "A" + (Sources_Array[Sources_Row].__rowNum__ + 1);
        return Sources[`${Cell}`].l.Target;
      }
    } catch {
      console.log("Found error on (Sources):");
      console.log("Row " + Sources_Row + " Data:" + Sources_Array[Sources_Row]);
    }
  }
}

function Find_In_Worksheets(
  Database_Array: any,
  Sources: any,
  Sources_Array: any,
  Query: string,
) {
  const Worksheet_Data = {};
  const Report_ID_Array = [];
  for (
    let Database_Row = 0;
    Database_Row < (Database_Array.length);
    Database_Row++
  ) {
    if (Database_Array[Database_Row]["Area Sub-Group"].includes(Query)) {
      const Report_ID = String(Database_Array[Database_Row]["#"]);
      if (!Report_ID_Array.includes(Report_ID)) {
        Worksheet_Data[Report_ID] = {
          "Title": Database_Array[Database_Row]["Title"].replace(/,/g, ""),
          "Country": Database_Array[Database_Row]["Country"].replace(
            /,/g,
            "",
          ),
          "Date Published": Database_Array[Database_Row]["Date Published"],
          "Indicators": [],
        };
        Worksheet_Data[Report_ID]["Indicators"].push(
          Database_Array[Database_Row]["Indicator"].replace(/,/g, ""),
        );
        const Source_Link = Find_Source_Link(
          Sources,
          Sources_Array,
          Database_Array[Database_Row]["#"],
        );
        Worksheet_Data[Report_ID]["Link"] = Source_Link;
        Report_ID_Array.push(Report_ID);
      } else {
        if (
          !Worksheet_Data[Report_ID]["Indicators"].includes(
            Database_Array[Database_Row]["Indicator"].replace(/,/g, ""),
          )
        ) {
          Worksheet_Data[Report_ID]["Indicators"].push(
            Database_Array[Database_Row]["Indicator"].replace(/,/g, ""),
          );
        }
      }
    }
  }
  return Worksheet_Data;
}

const Results = Array<string>;

for (const Item of Check_Items) {
  const Item_Results = Find_In_Worksheets(
    Database_Worksheet_Array,
    Sources_Worksheet,
    Sources_Worksheet_Array,
    Item,
  );
  Results[Item] = Item_Results;
}
console.log("[3/4] Successfully processed logic against Excel file.");

console.log(
  "[4/4] Writing processed results (in CSV format) to: " + args.Export,
);
let Results_Written_To_CSV = 0;
const Field_Separator = ",";
Deno.writeTextFile(
  args.Export,
  "Subgroup" + Field_Separator + "Title" + Field_Separator + "Indicators" +
    Field_Separator + "Link" + Field_Separator + "Report ID" + Field_Separator +
    "Country" + Field_Separator + "Date Published\n",
  { append: true },
);
for (const Query in Results) {
  for (const Report_ID in Results[Query]) {
    const Indicators = Results[Query][Report_ID]["Indicators"].length;
    for (
      let Indicator_Number = 0;
      Indicator_Number < Indicators;
      Indicator_Number++
    ) {
      const Result = String(
        Query + Field_Separator +
          Results[Query][Report_ID]["Title"].replace(/\n|\r/g, "") +
          Field_Separator +
          Results[Query][Report_ID]["Indicators"][Indicator_Number].replace(
            /\n|\r/g,
            "",
          ) + Field_Separator + Results[Query][Report_ID]["Link"] +
          Field_Separator + Report_ID + Field_Separator +
          Results[Query][Report_ID]["Country"] + Field_Separator +
          Results[Query][Report_ID]["Date Published"] + "\n",
      );
      Deno.writeTextFile(args.Export, Result, { append: true });
      Results_Written_To_CSV += 1;
    }
  }
}

console.log(
  "[4/4] Successfully wrote " + Results_Written_To_CSV +
    " results to CSV file: " +
    args.Export,
);

const Finish_Date = new Date();
// Calculate finish date/time difference, while convert Miliseconds to seconds
const Application_duration = (Finish_Date.valueOf() - Current_Date.valueOf()) /
  1000;
console.log(
  "Completed Alliance For Peacebuilding - Eirene Simplification application in " +
    Application_duration + " seconds.",
);
