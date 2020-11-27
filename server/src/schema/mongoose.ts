import mongoose from "mongoose";

const url = "mongodb+srv://dbmovie:anabiz@cluster0.mz3mo.mongodb.net/test";
//const uri = "mongodb+srv://dbmovie:<anabiz>@cluster0.mz3mo.mongodb.net/<dbname>?retryWrites=true&w=majority";

mongoose
  .connect(url)
  .then(() => console.log("i am in"))
  .catch(() => console.error("unable to connect"));

const anualReportSchema = new mongoose.Schema(
  {
    Year: String,
    Industry_aggregation_NZSIOC: String,
    Industry_code_NZSIOC: String,
    Industry_name_NZSIOC: String,
    Units: String,
    Variable_code: String,
    Variable_name: String,
    Variable_category: String,
    Value: String,
    Industry_code_ANZSIC06: String,

  },
  { timestamps: true },
);

export const AnualReport = mongoose.model("report", anualReportSchema);
