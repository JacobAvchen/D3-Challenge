var filepath = "../data/data.csv";


d3.csv(filepath)
  .then(function(data) {
      console.log(data);
  })
  .catch(function(error){
     // handle error   
  })