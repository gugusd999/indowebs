globalThis.maketable = {
    content: `

    <div class="container" id="makeTable">

    </div>

    `,
    action: function(){

        setTimeout(function(){

          class Maketable {
            constructor() {

            }

            getScema(){
              query(`
                SELECT *
                  FROM INFORMATION_SCHEMA.COLUMNS
              `, function(q){
                console.log(q)
              })
            }

            run(){
              this.getScema()
            }

          }

          new Maketable().run()

        })


    }
}
