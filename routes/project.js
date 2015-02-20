var models = require('../models');

exports.projectInfo = function(req, res) { 
  var projectID = req.params.id;

  // query for the specific project and
  // call the following callback
  models.Project.find({ _id: projectID }, function(err, projects) {
    console.log(projects);
    res.json(projects[0]);
  });

  function afterQuery(err, projects) {
    if(err) console.log(err);
    console.log(projects[0]);
    res.json(projects[0]);
  }
}

exports.addProject = function(req, res) {
  var form_data = req.body;
  console.log(form_data);
  var newProject = new models.Project({
    title: form_data.project_title,
    date: form_data.date,
    summary: form_data.summary,
    image: form_data.image
  });

  newProject.save(function(err) {
    res.send(200);
  });

  // make a new Project and save it to the DB
  // YOU MUST send an OK response w/ res.send();
}

exports.deleteProject = function(req, res) {
  var projectID = req.params.id;

  models.Project.find({ _id: projectID }, function(err, projects) {
    console.log(projects);
    models.Project.remove({ _id: projectID }, function(err) {
      res.send(200);
    });
  });

  // find the project and remove it
  // YOU MUST send an OK response w/ res.send();
}