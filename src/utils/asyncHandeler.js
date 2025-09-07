const asyncHandeler=(requiesthandeler)=>{
  return  (req,res,next)=>{
        Promise.resolve(requiesthandeler(req,res,next)).catch((err)=>next(err));
    }
}

export { asyncHandeler };

// const asyncHandeler = (fn) => async (req, res, next) => {
//   try {
//     await fn(req, res, next);
//   } catch (err) {
//     res.status(err.code || 500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// };
