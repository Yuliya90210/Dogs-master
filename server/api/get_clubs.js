const pg = require('pg');
const express = require('express')
const conString = "postgres://postgres:password@localhost:5432/exh";
const router = express.Router()

router.get('/get_clubs', async (req, res) => {    
  try {
      var client = new pg.Client(conString);
      await client.connect();
      const querystr = `select id, title from clubs`;
      
      var response = [];
      var resp = await client.query(querystr);
      resp.rows.forEach(row => {
          response.push({
            id: row.id,
            title: row.title
          })
      });
      
      await client.end()
      res.send({data: response})
  }
  catch(e){
      console.log(`error - ${e}`)
  }
})

module.exports = router 