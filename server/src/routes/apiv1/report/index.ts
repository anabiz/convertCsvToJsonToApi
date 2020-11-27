import { Request, Response, Router } from "express";
import { AnualReport } from "../../../schema/mongoose"

const router = Router();

router.post("/", async function (req: Request, res: Response) {
  try {
console.log("i was discovered")
    const report = new AnualReport(req.body)
    const result = await report.save();

    return res.status(200).json({
      data: {
        result: result,
      },
      error: "",
      next: "",
      previous: "",
    });
  } catch (error) {
    return res.status(500).json({ err: error })
  }

});


// router.get("/", async function (req: Request, res: Response) {
//   try {

//   } catch (error) {

//   }

//   // res.status(200).json({
//   //   data: {
//   //     result: "hello",
//   //   },
//   //   error: "",
//   //   next: "",
//   //   previous: "",
//   // });
// });

export default router;
