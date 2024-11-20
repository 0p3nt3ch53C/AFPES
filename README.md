# Alliance For Peacebuilding - Eirene Simplification

A project written to help support the Alliance For Peacebuilding's Eirene
Database efforts, with simplification of data querying/parsing.

## Alliance For Peacebuilding

<code style="color : aqua">☮</code> Alliance For Peacebuilding (AFP) is an
organization that supports catalization of collective worldwide action,
including advocating for governance related regulation and standards, collecting
evidence, and telling the story of those affected by peace based challenges.

:blue_book: Read more about Alliance For Peacebuilding
[here](https://www.allianceforpeacebuilding.org).

## Eirene

AFP maintains their Eirene database, which serves as a repository of collected
works, evidence, and related data. AFP provides the capability for students,
researchers, and those who can access the internet, the capability to review
thier Eirene database.

:blue_book: Read more about Alliance For Peacebuilding's Eirene Database
[here](https://www.allianceforpeacebuilding.org/eirene-peacebuilding-database).

:blue_book: Eirene Database ([Box.com](https://www.box.com/) hosted Excel file)
[here](https://allianceforpeacebuilding.app.box.com/s/ggizicws9ah2rgg3w0tfkju5voi1mvt6).

## Eirene Simplification

In a project to simplify and parse data from Eirene, some in the project found
the dataset to be large, and difficult to navigate for specific information. In
order to support one use case to resolve this, the AFPES (Alliance For
Peacebuilding - Eirene Simplification) application has been developed. This
project (and further, application) have been written to make the data more
parsable and queryable as a csv, based on select fields (and tables) from the
Eirene Excel spreadsheet (mentioned above).

This application is has no affiliation, support of, or legal connection to AFP
or any other legal entity.

### AFPES Use Case

The criteria below is collected by AFPES, in order to review select datapoints
mentioned in below subgroups. AFPES Data Extraction from Eirene will extract the
following criteria:

<details>

<summary>Criteria</summary>

- Subgroup
- Title
- Indicator
- Link
- Report ID
- Country
- Date Published

</details>


From the following areas "Social Cohesion" and "Trust" subgroups:

<details>

<summary>Subgroups</summary>

1. "% who perceive trust or lack thereof within their neighborhood",
2. "Attitudes towards diversity and pluralism",
3. "Attitudes towards inter-group interaction",
4. "Attitudes towards peace and reconciliation processes",
5. "Community perceptions of youth",
6. "Economic cohesion",
7. "Engagement in community",
8. "Existence and frequency of interaction between groups",
9. "Gender Equality",
10. "Integration of marginalized groups",
11. "Knowledge of Social Cohesion",
12. "Level of discrimination",
13. "Level of discrimination (Human rights)",
14. "Level of diversity",
15. "Level of responsibility felt for community",
16. "Level of tension/conflict between groups",
17. "Perceived self-efficacy to impact positive change in community",
18. "Perceptions of other groups",
19. "Progress on peace and reconciliation processes",
20. "Quality of multi-group projects/initiatives",
21. "Quality of relationship between groups",
22. "Quality of relationship between groups (Empathy)",
23. "Quality of relationship between groups (Trust)",
24. "Quantity of multi-group projects/initiatives",
25. "Reintegration of ex-combatants",
26. "Religious Tolerance",
27. "Socio-Economic Equality",
28. "Socio-Economic Equality (Capacity Development)",
29. "Socio-Economic Equality (Employment)",
30. "Socio-Economic Equality (Marginalized groups)",
31. "Strength of identity",
32. "Strength of network across communities",
33. "Strength of network within communities",
34. "Willingness to Reconcile",
35. "Youth Engagement",
36. "% who perceive trust or lack thereof within their neighborhood",
37. "Attitudes towards inter-group interaction (Trust)",
38. "Community perceptions of youth (Trust)",
39. "Community-Security forces relations (Trust)",
40. "Existence and frequency of interaction between groups (Trust)",
41. "Level of general trust",
42. "Level of institutional/political trust",
43. "Perceptions of other groups (Trust)",
44. "Quality of relationship between groups (Trust)",
45. "Rule of Law (Confidence in Justice System)",
46. "Trust and confidence in conflict resolving mechanisms",
47. "Trust in government institutions"

</details>

### AFPES Data Export

The data processed in AFPES is exported as a CSV file (NOTE: Data from AFP
Eirene that contained commas, will be stripped as part of processing). The
format will look similar to this:

<details>

<summary>Example Export</summary>

```
Subgroup,Title,Indicators,Link,Report ID,Country,Date Published
% who perceive trust or lack thereof within their neighborhood,Towards a social cohesion index for South Africa using SARB data,Inter-group trust,https://static1.squarespace.com/static/5db70e83fc0a966cf4cc42ea/t/5f330df3dc8bae025343c25d/1597181428514/0100.pdf,100,South Africa,2017
Trust and confidence in conflict resolving mechanisms,Evaluation report: Peaceful Empowerment in Arid Lands (PEARL) ,Perceived effectiveness of responses to conflict,https://static1.squarespace.com/static/5db70e83fc0a966cf4cc42ea/t/5f49305094cd4c07e3fb4309/1598632016736/1810.pdf,1810,Kenya,2017
```

</details>


### AFPES Example Run

When attempting to run AFPES, use the following as parameters / arguments:


#### --AFPE

```"--AFPE"```:
This tells AFPES where the file for the Eirene database (Excel file) is located. By default (unless specified) AFPES will assume the filename and location is in the same directory AFPES is running from, and is named 'EAFP.xlsx'.

In example: ```--AFPE "AfP_EirenePeacebuildingDatabase_2.2020.xlsx"```

Full example (Windows): ```.\AFPES.exe --AFPE "AfP_EirenePeacebuildingDatabase_2.2020.xlsx"```


#### --Export

```"--Export"```:
This tells AFPES where the exported data (in CSV format) should go. By default (unless specified) AFPES will write a file to the same filename and location in the same directory AFPES is running from, named "Eirene Peacebuilding Database Subgroups MM-DD-YYYY HHMMSS.csv". Timestamp (MM-DD-YYYY HHMMSS) follows the format here: first MM = two digit month, DD = two digit day, YYYY = four digit year(s), HH two digit hour(s) (based on 24 hour clock, not 12hour clock), second MM = two digit minute(s), SS = two digit second(s).

In example: ```--Export "Log.csv"```

Full example (Windows)*: ```AFPES.exe --AFPE "AfP_EirenePeacebuildingDatabase_2.2020.xlsx" --Export "Log.csv"```
* Builds off of previous example explained in "--AFPE".


#### None

AFPES can be run with no arguments, provided you follow the defaults in the above arguments direction. Based on the arguments above, if you simply have a file "EAFP.xlsx" in the same directory as the AFPES application, you can run this application without any arguments, and we should expect to see an additional file (e.g., "Eirene Peacebuilding Database Subgroups 11-01-2024 170954.csv") when AFPES is completed.

Example: ```AFPES.exe```


### AFPES Technical Details

<p align="left">
    <a href="https://coveralls.io/github/badges/shields">
        <img src="https://img.shields.io/coveralls/github/badges/shields"
            alt="Code Coverage"></a>
    <a href="https://www.typescriptlang.org">
        <img src="https://img.shields.io/badge/Code-TypeScript-blue?logo=typescript&logoColor=blue"
            alt="TypeScript"></a>
    <a href="https://deno.com">
        <img src="https://img.shields.io/badge/Runtime-Deno-white?logo=deno&logoColor=f5f5f5"
            alt="Deno"></a>
</p>

The AFPES is written in Typescript, compiled in Deno.

<p align="left">
    <a href="https://apple.com">
        <img src="https://img.shields.io/badge/Apple%20MacOS-gray?logo=apple&logoColor=white"
            alt="Apple/MacOS"></a>
    <a href="https://linux.org">
        <img src="https://img.shields.io/badge/GNU%2FLinux-gray?logo=linux&logoColor=white"
            alt="Linux"></a>
    <a href="https://microsoft.com">
        <img src="https://img.shields.io/badge/Microsoft%20Windows-gray?logo=c%2B%2B&logoColor=blue"
            alt="Windows"></a>
</p>

The AFPES application is compiled to work on multiple operating systems,
including Apple MacOS, GNU/Linux, and Microsoft Windows.
