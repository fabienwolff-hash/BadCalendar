function parseDate(v){

  if(!v) return new Date(9999,0,1);

  if(v instanceof Date) return v;

  if(typeof v === "string"){

    if(v.includes("-")){
      const [y,m,d] = v.split("-");
      return new Date(Number(y),Number(m)-1,Number(d));
    }

    if(v.includes("/")){
      const [d,m,y] = v.split("/");
      return new Date(Number(y),Number(m)-1,Number(d));
    }

  }

  const d = new Date(v);
  return isNaN(d) ? new Date(9999,0,1) : d;

}

function readEvents(){

  const ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);

  const sheet = ss.getSheetByName(CONFIG.SHEET_NAME);

  const values = sheet.getDataRange().getValues();

  const headers = values[0];
  const rows = values.slice(1);

  const events = rows
    .filter(r => r && r[0] !== "")
    .map(row => {

      const raw = {};

      headers.forEach((h,i)=>{

        raw[h] = row[i];

      });

      const start = parseDate(raw.DateDebut);
      const end = parseDate(raw.DateFin);

      return {
        type: raw.Type || "",
        title: raw.Titre || "",
        startDate: start,
        endDate: end,
        location: raw.Lieu || "",
        category: raw.CategorieAffichee || "",
        registrationType: raw.TypeInscription || "",
        registrationUrl: raw.LienInscription || "",
        active: raw.Actif === "✅"
      };

    })
    .filter(e => e.active)
    .sort((a,b)=> a.startDate.getTime() - b.startDate.getTime());

  return JSON.parse(JSON.stringify(events));

}