(function() {
  angular
    .module('starter.controllers')
    .factory('DB', function($ionicPlatform, $cordovaSQLite){
      var service = {};

      var db;
      service.setDB = function(mydb) {
        db = mydb;
      }
      service.getDB = function() {
        return db;
      }

      service.executeSql = function(sql) {
        return $cordovaSQLite.execute(db, sql);
      }

      service.refreshTables = function() {
        service.dropTables();
        service.createTables();
      }

      service.initializeRows = function() {
        var insert_users = [
          "INSERT INTO User (id, name) VALUES (1, 'Steven');",
          "INSERT INTO User (id, name) VALUES (2, 'Shailja');",
        ];
        insert_users.forEach(function(query) {
          service.executeSql(query).then(function(res) {
            console.log("INSERT ID -> " + res.insertId);
          }, function (err) {
            console.error(JSON.stringify(err, null, 4));
          });
        });
      }

      service.dropTables = function() {
        var drop_tables = [
          "DROP TABLE IF EXISTS User;",
          "DROP TABLE IF EXISTS Courses;",
          "DROP TABLE IF EXISTS Session;",
          "DROP TABLE IF EXISTS Modules;",
          "DROP TABLE IF EXISTS Learning_Objectives;",
          "DROP TABLE IF EXISTS Skills;",
          "DROP TABLE IF EXISTS Questions;",
          "DROP TABLE IF EXISTS Question_Types;",
          "DROP TABLE IF EXISTS Choices;",
          "DROP TABLE IF EXISTS Responses;",
          "DROP TABLE IF EXISTS Session_Question_Pool;",
          "DROP TABLE IF EXISTS Question_Skills;",
        ];
        drop_tables.forEach(function(query) {
          $cordovaSQLite.execute(db, query).then(function(res) {
            console.log("DROP ID -> " + res);
          }, function (err) {
            console.error(err);
          });
        });
      }

      service.createTables = function() {
        /*User:
        1. id
        2. text
        */
        var query = "CREATE TABLE IF NOT EXISTS User (id integer primary key, name text);";

        /* Courses:
        1. course_id
        2. course_name
        3. course_description
        4. active
        */
        var query_courses = "CREATE TABLE IF NOT EXISTS Courses (course_id TEXT NOT NULL PRIMARY KEY,"+
                            "course_name TEXT NOT NULL, course_description TEXT NOT NULL, status TEXT NOT NULL);";


        /* Session:
        1. session_id
        2. created_at
        3. ended_at
        */
        var query_session = "CREATE TABLE IF NOT EXISTS Sessions (session_id INT PRIMARY KEY, "+
                            "created_at DATE, ended_at DATE);";

        /* Modules:
        1. module_id
        2. module_name
        3. module_description
        4. available
        5. course_id
        */
        var query_modules = "CREATE TABLE IF NOT EXISTS Modules (module_id TEXT NOT NULL PRIMARY KEY,"+
                            "module_name TEXT NOT NULL, module_description TEXT, "+
                            "available INT NOT NULL, course_id TEXT NOT NULL,"+
                            "FOREIGN KEY (course_id) REFERENCES Courses(course_id));";

        /* Learning_Objectives:
        1. learning_objective_id
        2. learning_objective_name
        3. module_id
        */
        var query_learning_objectives = "CREATE TABLE IF NOT EXISTS Learning_Objectives ("+
                                        "learning_objective_id TEXT NOT NULL PRIMARY KEY,"+
                                        "learning_objective_name TEXT NOT NULL,"+
                                        "module_id TEXT NOT NULL,"+
                                        "FOREIGN KEY (module_id) REFERENCES Modules(module_id));";

        var query_skills =  "CREATE TABLE IF NOT EXISTS Skills ("+
                              "skill_id TEXT NOT NULL PRIMARY KEY,"+
                              "skill_name TEXT NOT NULL,"+
                              // "learning_objective_id TEXT,"+
                              "skill_description TEXT NOT NULL,"+
                              "last_timestamp DATE,"+
                              "accuracy INT NOT NULL"+
                              // "FOREIGN KEY (learning_objective_id) REFERENCES Learning_Objectives(learning_objective_id)"+
                            ");";

        // Questions :
        // 1. question_id (PK) : unique id for each question
        // 2. question_text : question text
        // 3. hint : question hint
        // 4. bookmarked : 0 - not bookmarked , 1 - bookmarked
        // 5. last_response_timestamp : NULL - question is never seen before , date - question was last seen on that specific date
        // 6. last_response_correctness : NULL -  question is never seen before, 0 - last response was incorrect, 1 - last response was correct
        // 7. never_show_again : 0 - question will show again, 1 - question will never show again
        // 8. module_id (FK) : module id is a foreign key
        // 9. question_type (FK) : question_type is a foreign key

        var query_questions = "CREATE TABLE IF NOT EXISTS Questions (question_id TEXT NOT NULL PRIMARY KEY,"+
                              "question_text TEXT NOT NULL,"+ "hint TEXT NOT NULL, bookmarked INT NOT NULL,"+
                              "last_response_timestamp DATE, last_response_correctness INT, never_show_again INT NOT NULL,"+
                              "module_id TEXT NOT NULL, question_type TEXT NOT NULL,"+
                              "FOREIGN KEY (module_id) REFERENCES Modules(module_id)"+
                              ");";

        /* Question_Types:
        1. question_type
        2. question_id
        */
        var query_questions_types =  "CREATE TABLE IF NOT EXISTS Question_Types ("+
                                     "question_type TEXT NOT NULL PRIMARY KEY, question_id TEXT NOT NULL,"+
                                     "FOREIGN KEY (question_id) REFERENCES Questions(question_id));";

        /* Choices:
        1. choice_id
        2. choice_text
        3. feedback
        4. isCorrect
        5. question_id
        */
        var query_choices =  "CREATE TABLE IF NOT EXISTS Choices (choice_id INT PRIMARY KEY, "+
                             "choice_text TEXT NOT NULL, feedback TEXT NOT NULL,"+
                             "isCorrect INT NOT NULL, question_id TEXT NOT NULL, "+
                             "FOREIGN KEY (question_id) REFERENCES Questions(question_id));";

        /* Responses:
        1. response_id
        2. isCorrect
        3. timestamp
        4. question_id
        */
        var query_responses =  "CREATE TABLE IF NOT EXISTS Responses (response_id INT NOT NULL PRIMARY KEY,"+
                               "isCorrect INT NOT NULL, timestamp DATE, question_id TEXT NOT NULL,"+
                               "FOREIGN KEY (question_id) REFERENCES Questions(question_id));";

        /* Session_Question_Pool:
        1. question_id
        2. session_id
        */
        var query_session_question_pool =  "CREATE TABLE IF NOT EXISTS Session_Question_Pool ("+
                                           "question_id TEXT NOT NULL, session_id TEXT NOT NULL,"+
                                           "FOREIGN KEY (question_id) REFERENCES Questions(question_id),"+
                                           "FOREIGN KEY (session_id) REFERENCES Session(session_id));";

        /* Question_Skills:
        1. question_id
        2. skill_id
        */
        var query_question_skills =  "CREATE TABLE IF NOT EXISTS Question_Skills ("+
                                       "question_id TEXT NOT NULL,"+
                                       "skill_id TEXT NOT NULL,"+
                                       "FOREIGN KEY (question_id) REFERENCES Questions(question_id),"+
                                       "FOREIGN KEY (skill_id) REFERENCES Skills(skill_id)"+
                                     ");";

        $cordovaSQLite.execute(db, query);
        $cordovaSQLite.execute(db, query_courses);
        $cordovaSQLite.execute(db, query_session);
        $cordovaSQLite.execute(db, query_modules);
        $cordovaSQLite.execute(db, query_learning_objectives);
        $cordovaSQLite.execute(db, query_skills);
        $cordovaSQLite.execute(db, query_questions);
        $cordovaSQLite.execute(db, query_questions_types);
        $cordovaSQLite.execute(db, query_choices);
        $cordovaSQLite.execute(db, query_responses);
        $cordovaSQLite.execute(db, query_session_question_pool);
        $cordovaSQLite.execute(db, query_question_skills);
      }

      /*INSERT FUNCTIONS*/
      service.insertCourse = function (course_id, course_name, course_description, status){
        $cordovaSQLite.execute(db, 'INSERT INTO Courses (course_id, course_name, course_description, status) VALUES (?,?,?,?)', [course_id, course_name, course_description, status])
          .then(function(result) {
            console.log("Course inserted : "+ course_id + " , "+ course_name + " , "+ course_description+ " , "+status+ " INSERT ID -> " + result.insertId);
          }, function(error) {
            console.error("Course Insert Error message: "+ error);
          });
        }

      service.insertSession = function (){
      //session-id is incremented according to the ROWID
        $cordovaSQLite.execute(db, "INSERT INTO Sessions (created_at, ended_at) VALUES ('datetime()','datetime()')")
           .then(function(result) {
               console.log("Session INSERT ID -> " + result.insertId);
           }, function(error) {
               console.error("Session Insert Error message: "+ error);
           });
      }

      service.insertModule = function (module_id, module_name, module_description, available, course_id ){
        $cordovaSQLite.execute(db, 'INSERT INTO Modules (module_id, module_name, module_description, available, course_id) VALUES (?,?,?,?,?)', [module_id, module_name, module_description, available, course_id])
               .then(function(result) {
                   console.log("Module INSERT ID -> " + result.insertId);
               }, function(error) {
                   console.error("Module Insert Error message: "+ JSON.stringify(error, null, 4));
               })

        }

      service.insertLearningObjective = function ( learning_objective_id, learning_objective_name, module_id ){

        $cordovaSQLite.execute(db, 'INSERT INTO Learning_Objectives (learning_objective_id, learning_objective_name, module_id) VALUES (?,?,?)', [learning_objective_id, learning_objective_name, module_id])
               .then(function(result) {
                   console.log("Learning_Objective INSERT ID -> " + result.insertId);
               }, function(error) {
                   console.error("Learning_Objective Insert Error message: "+ error);
               })
        }

      service.insertSkill = function ( skill_id, skill_name, skill_description, last_timestamp, accuracy ){

        $cordovaSQLite.execute(db, 'INSERT INTO Skills (skill_id, skill_name, skill_description, last_timestamp, accuracy) VALUES (?,?,?,?,?)', [skill_id, skill_name, skill_description, last_timestamp, accuracy])
               .then(function(result) {
                   console.log("Skill INSERT ID -> " + result.insertId);
               }, function(error) {
                   console.error("Skill Insert Error message: "+ JSON.stringify(error));
               })

      }

      // service.insertSkill = function ( skill_id, skill_name, learning_objective_id, skill_description, last_timestamp, accuracy ){

      //   $cordovaSQLite.execute(db, 'INSERT INTO Skills (skill_id, skill_name, learning_objective_id, skill_description, last_timestamp, accuracy) VALUES (?,?,?,?,?,?)', [skill_id, skill_name, learning_objective_id, skill_description, last_timestamp, accuracy, learning_objective_id])
      //          .then(function(result) {
      //              console.log("Skill INSERT ID -> " + result.insertId);
      //          }, function(error) {
      //              console.error("Skill Insert Error message: "+ JSON.stringify(error));
      //          })

      //   }

      service.insertQuestion = function ( question_id, question_text, hint, bookmarked, last_response_timestamp, last_response_correctness, never_show_again, module_id, question_type ){

        $cordovaSQLite.execute(db, 'INSERT INTO Questions ( question_id, question_text, hint, bookmarked, last_response_timestamp, last_response_correctness, never_show_again,module_id, question_type) VALUES (?,?,?,?,?,?,?,?,?)', [question_id, question_text, hint, bookmarked, last_response_timestamp, last_response_correctness, never_show_again,module_id, question_type])
               .then(function(result) {
                   //console.log("Question:"+ question_id+ " "+ question_text +" "+ hint+ " "+ bookmarked +" "+ last_response_timestamp +" "+ last_response_correctness+" "+ never_show_again+" "+module_id+" "+ question_type);
                   console.log("Question INSERT ID -> "+ result.insertId+" question_id: " + question_id);
               }, function(error) {
                   console.error("Question Insert Error message: "+ JSON.stringify(error, null, 4));
               })

        }

      service.insertQuestionType = function ( question_type, question_id ){

        $cordovaSQLite.execute(db, 'INSERT INTO Question_Types (question_type, question_id ) VALUES (?,?)', [question_type, question_id])
               .then(function(result) {
                   console.log("Question_Type INSERT ID -> " + result.insertId);
               }, function(error) {
                   console.error("Question_Type Insert Error message: "+ JSON.stringify(error, null, 4));
               })
        }

      service.insertChoice = function ( choice_id, choice_text, feedback, isCorrect, question_id){

        $cordovaSQLite.execute(db, 'INSERT INTO Choices (choice_id, choice_text, feedback, isCorrect, question_id) VALUES (?,?,?,?,?)', [choice_id, choice_text, feedback, isCorrect, question_id])
               .then(function(result) {
                   console.log("Choice INSERT ID -> " + result.insertId);
               }, function(error) {
                   console.error("Choice Insert Error message: "+ JSON.stringify(error, null, 4));
               })

        }

      service.insertResponse = function ( response_id, isCorrect, timestamp, question_id ){

        $cordovaSQLite.execute(db, 'INSERT INTO Responses (response_id, isCorrect, timestamp, question_id) VALUES (?,?,?,?)', [response_id, isCorrect, timestamp, question_id])
               .then(function(result) {
                   console.log("Response INSERT ID -> " + result.insertId);
               }, function(error) {
                   console.error("Response Insert Error message: "+ JSON.stringify(error, null, 4));
               })

        }

      service.insertSessionQuestion = function ( session_id, created_at, ended_at ){

        $cordovaSQLite.execute(db, 'INSERT INTO Session_Question_Pool (session_id, created_at, ended_at) VALUES (?,?,?)', [course_id, course_name, course_description])
               .then(function(result) {
                   console.log("SessionQuestion INSERT ID -> " + result.insertId);
               }, function(error) {
                   console.error("SessionQuestion Insert Error message: "+ JSON.stringify(error, null, 4));
               })

        }

      service.insertQuestionSkills = function ( question_id, skill_id ){

        $cordovaSQLite.execute(db, 'INSERT INTO Question_Skills (question_id, skill_id) VALUES (?,?)', [question_id, skill_id])
               .then(function(result) {
                   console.log("Question_Skill INSERT ID -> " + result.insertId);
               }, function(error) {
                   console.error("Question_Skill Insert Error message: "+ JSON.stringify(error, null, 4));
               })

        }

      /*SELECT FUNCTIONS*/
      service.selectCourse = function (){
        var query =  "SELECT * FROM Courses";
        console.log("query: "+ query);
        return $cordovaSQLite.execute(db, query);
      }

      service.selectSession = function (){
        var query =  "SELECT * FROM Sessions";
        console.log("query: "+ query);
        return $cordovaSQLite.execute(db, query);
      }

      service.selectModule = function (){
        var query =  "SELECT * FROM Modules";
        console.log("query: "+ query);
        return $cordovaSQLite.execute(db, query);
      }

      service.selectLearningObjective = function (){
        var query =  "SELECT * FROM Learning_Objectives";
        console.log("query: "+ query);
        return $cordovaSQLite.execute(db, query);
      }

      service.selectSkill = function (){
        var query =  "SELECT * FROM Skills";
        console.log("query: "+ query);
        return $cordovaSQLite.execute(db, query);
      }

      service.selectQuestionType = function (){
        var query =  "SELECT * FROM Question_Types";
        console.log("query: "+ query);
        return $cordovaSQLite.execute(db, query);
      }

      service.selectChoices = function (question_id){
        var query =  "SELECT * FROM Choices WHERE question_id='"+question_id+"'";
        console.log("query: "+ query);
        return $cordovaSQLite.execute(db, query);
      }

      service.selectQuestions = function (){
        //var query = "SELECT * FROM Questions WHERE question_type='"+question_type+"' AND module_id='"+module_id+"' AND never_show_again=0 AND last_response_correctness=null ";
        var query =  "SELECT * FROM Questions";
        console.log("query: "+ query);
        return $cordovaSQLite.execute(db, query);
      }

      service.selectQuestionFromModules = function (module_id){
        var query =  "SELECT * FROM Questions WHERE module_id='"+module_id+"'";
        console.log("query: "+ query);
        return $cordovaSQLite.execute(db, query);
      }

      service.selectBookmarkedQuestions = function (){
        console.log("in select question function in app.js");
        var query =  "SELECT * FROM Questions WHERE bookmarked=1";
        console.log("query: "+ query);
        return $cordovaSQLite.execute(db, query);
      }

      service.selectResponses= function (question_id){
        var query =  "SELECT * FROM Responses WHERE question_id='"+question_id+"'";
        console.log("query: "+ query);
        return $cordovaSQLite.execute(db, query);
      }

      /*** Question Selection Logic ***/

      /* Find the skills for a list of modules
        SELECT S.skill_id
        FROM Questions AS Q
        JOIN Question_Skills AS Q_S ON Q.question_id = Q_S.question_id
        JOIN Skills AS S ON S.skill_id = Q_S.skils_id
        WHERE Q.module_id IN {}
        ORDER BY S.accuracy ASC
        LIMIT {}

      */

    service.selectSkillsFromModules = function (modules, checkpoint_num_questions){
      var allModules = modules.toString();
      console.log(allModules);

      var query = "SELECT DISTINCT S.skill_id, S.accuracy FROM Questions AS Q JOIN Question_Skills AS Q_S ON Q.question_id = Q_S.question_id ";
      query = query + "JOIN Skills AS S ON S.skill_id = Q_S.skill_id WHERE Q.module_id IN ("+ allModules +")";
      query = query + " ORDER BY S.accuracy ASC";// LIMIT {" + checkpoint_num_questions +"}";

      //console.log("query: " + query);
      return $cordovaSQLite.execute(db, query);
    }

      /*
        # Select Unseen Questions
        SELECT *
        FROM Questions AS Q
        JOIN Question_Skills AS Q_S ON Q.question_id = Q_S.question_id
        JOIN Skills AS S S.skill_id = Q_S.skill_id
        WHERE Q.last_response_timestamp IS NULL
             AND S.skill_id = {}
        LIMIT 2
      */

      service.selectUnseenQuestionsForSkill = function (skill_id){
      var query = "SELECT * FROM Questions AS Q JOIN Question_Skills AS Q_S ON Q.question_id = Q_S.question_id";
      query = query + " JOIN Skills AS S ON S.skill_id = Q_S.skill_id";
      query = query + " WHERE Q.last_response_timestamp IS NULL AND S.skill_id ='"+skill_id+"'";
      query = query + " LIMIT 2";

      //console.log("query: " + query);
      return $cordovaSQLite.execute(db, query);
     }

      /*
      # Select 1 Incorrect Question
      SELECT *
      FROM Questions AS Q
      JOIN Question_Skills AS Q_S ON Q.question_id = Q_S.question_id
      JOIN Skills AS S S.skill_id = Q_S.skill_id
      WHERE Q.last_response_correctness IS 0
           AND S.skill_id = {}
      ORDER BY Q.last_response_timestamp ASC
      LIMIT 1
      */

      service.selectIncorrectQuestionForSkill = function (skill_id){
      var query = "SELECT * FROM Questions AS Q JOIN Question_Skills AS Q_S ON Q.question_id = Q_S.question_id";
      query = query + " JOIN Skills AS S ON S.skill_id = Q_S.skill_id";
      query = query + " WHERE Q.last_response_correctness IS 0 AND S.skill_id ='"+skill_id+"'";
      query = query + " ORDER BY Q.last_response_timestamp ASC LIMIT 1";

      //console.log("query: " + query);
      return $cordovaSQLite.execute(db, query);
      }

      /*
      # Select 1 Correct Question
      SELECT *
      FROM Questions AS Q
      JOIN Question_Skills AS Q_S ON Q.question_id = Q_S.question_id
      JOIN Skills AS S S.skill_id = Q_S.skill_id
      WHERE Q.last_response_correctness IS 1
           AND S.skill_id = {}
      ORDER BY Q.last_response_timestamp ASC
      LIMIT 1
      */

      service.selectCorrectQuestionForSkill = function (skill_id){
      var query = "SELECT * FROM Questions AS Q JOIN Question_Skills AS Q_S ON Q.question_id = Q_S.question_id";
      query = query + " JOIN Skills AS S ON S.skill_id = Q_S.skill_id";
      query = query + " WHERE Q.last_response_correctness IS 1 AND S.skill_id ='"+skill_id+"'";
      query = query + " ORDER BY Q.last_response_timestamp ASC LIMIT 1";

      console.log("query: " + query);
      return $cordovaSQLite.execute(db, query);
      }

      return service;
    });
})();
