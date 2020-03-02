const router = require('express').Router();
const Exercise = require('../models/exercise_model');
const auth=require('../middlewares/auth');

// Getting all the exercises list
router.route('/').get((req, res) => {
    Exercise.find()
        .then(exercises =>res.json(exercises))
        .catch(err => res.status(400).json(`Error: ` + err));
});

// Creating or adding exercise
router.route('/add').post((req, res) => {
    
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);
    
    const newExercise = new Exercise({
        
        description,
        duration,
        date,

        
        
    });

    newExercise.save()
        .then(() => res.json('Exercise added! '))
        .catch(err => res.status(400).json(`Error: ` + err));
});

// Getting a specific exercise
router.get('/:id', (req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise => res.json(exercise))
        .catch(err => res.status(400).json(`Error: ` + err));
});

// Deleting an exercise
router.route('/:id').delete((req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
        .then(() => res.json('Exercise deleted!'))
        .catch(err => res.status(400).json(`Error: ` + err));
});

// Updating an exercise
router.route('/update/:id').put((req, res) => {
    Exercise.findByIdAndUpdate(req.params.id)
        .then(exercise => {
            
            exercise.description = req.body.description;
            exercise.duration = Number(req.body.duration);
            exercise.date = Date.parse(req.body.date);
            exercise.status=req.body.status;
            

            exercise.save()
                .then(() => res.json('Exercise updated !'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

// Updating status of exercise
router.route('/updateStatus/:id').put((req,res) => {
    
    Exercise.findByIdAndUpdate(req.params.id)
    .then(exercise=>{
        exercise.status=req.body.status;
        
        exercise.save()
            .then(()=>res.json('Exercise status updated successfully'))
            .catch(err=>console.log(err)
            )        
    })
    .catch(()=>{console.log(err)})
})

module.exports = router;