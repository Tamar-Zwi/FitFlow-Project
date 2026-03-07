# 🏋️ מערכת ניהול חדר כושר - Gym Management API

פרויקט זה הוא מערכת Backend שלמה לניהול חדר כושר, שנבנתה בגישת **Clean Code** ותוך הקפדה על עקרונות **SOLID**. המערכת מאפשרת ניהול לקוחות, רישום לשיעורים ומעקב נתונים בזמן אמת.

## 🛠 טכנולוגיות וכלים (Tech Stack)
* **Backend:** ASP.NET Core Web API (NET Core).
* **Database:** SQL Server בשילוב עם Entity Framework Core.
* **Mapping:** שימוש ב-AutoMapper להפרדה בין הישויות (Entities) לבין ה-DTOs.
* **Documentation:** תיעוד מלא של ה-Endpoints באמצעות Swagger.
* **Performance:** כתיבת קוד אסינכרונית מלאה (Async/Await) לביצועים אופטימליים.

## ✨ פיצ'רים מרכזיים
* **ניהול לקוחות:** הרשמה, עדכון פרטים ומחיקת מנויים (CRUD מלא).
* **הרשמה לשיעורים:** מערכת לוגית חכמה שמאפשרת ללקוחות להירשם לשיעורים קיימים.
* **בדיקות תקינות:** וולידציה על כל הקלט שנכנס למערכת כדי לשמור על תקינות מסד הנתונים.

## 🏗 דגשים ארכיטקטוניים (Architectural Highlights)
* **SOLID Principles:** חלוקה לאחריות אחת לכל מחלקה, מה שמקל על תחזוקה והרחבה של הקוד בעתיד.
* **Repository Pattern:** הפרדה בין לוגיקת הנתונים לבין ה-Controllers.
* **DTOs:** שימוש במודלים ייעודיים להעברת נתונים כדי לא לחשוף את מבנה מסד הנתונים החוצה (אבטחה משופרת).

## 🚀 איך להריץ את הפרויקט?
1. בצעו Clone לפרויקט למחשב שלכם.
2. הגדירו את ה-Connection String שלכם לקובץ ה-`appsettings.json`.
3. הריצו את הפקודה `Update-Database` ב-Package Manager Console כדי ליצור את טבלאות ה-SQL.
4. לחצו על F5 ב-Visual Studio.
5. ה-Swagger ייפתח אוטומטית בכתובת: `https://localhost:[PORT]/swagger`.