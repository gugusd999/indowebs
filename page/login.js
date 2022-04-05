globalThis.Login = {
    content: `
        <style>
            #container-login{
              position: fixed;
              width: 100vw;
              height: 100vh;
              display: flex;
              align-content: center;
              justify-content: center;
            }

            #login-form{
              margin-top: calc(50vh - 160px);
              height: 350px;
              padding: 20px;
              width: 350px;
              box-shadow:  0 0 10px rgba(100,100,100,0.3)
            }

            #login-form button{
              width: 100%;
            }

        </style>
        <div id="container-login">
            <div id="login-form">
                <h3 class="text-center">Login</h3>
                <div class="form-group">
                    <label>Username</label>
                    <input id="username" type="username" class="form-control" placeholder="inputkan username" />
                </div>
                <div class="form-group">
                    <label>Password</label>
                    <input id="password" type="password" class="form-control" placeholder="inputkan password" />
                </div>
                <button id="login-action" class="btn btn-primary">Login</button>
                <button class="btn btn-light mt-3" onclick="window.history.back()">Home</button>
            </div>
        </div>
    `,
    action: function(){
        setTimeout(function(){
            document.getElementById('login-action').addEventListener('click', function(){
              var data = {
                username: document.getElementById('username').value,
                password: document.getElementById('password').value
              }

              db()
              .getToken(data)

            },false)
        })
    }
}