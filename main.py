from flask import Flask, render_template, request, redirect, flash

app = Flask(__name__)
app.secret_key = "chave_secreta"

@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        nome = request.form.get("nome")
        email = request.form.get("email")
        email2 = request.form.get("email2")
        senha = request.form.get("senha")
        senha2 = request.form.get("senha2")
        telefone = request.form.get("telefone")
        cpf = request.form.get("cpf")

        erros = []

        if not nome or len(nome) < 3 or len(nome) > 50:
            erros.append("Nome deve ter entre 3 e 50 caracteres.")

        if email != email2:
            erros.append("Emails não conferem.")

        if len(senha) < 8:
            erros.append("Senha deve ter no mínimo 8 caracteres.")
        if senha != senha2:
            erros.append("Senhas não conferem.")

        if len(telefone) != 15 or not telefone.startswith("("):
            erros.append("Telefone inválido.")

        if len(cpf) != 14:
            erros.append("CPF inválido.")

        if erros:
            for e in erros:
                flash(e)
            return redirect("/")

        flash("Cadastro realizado com sucesso!")
        return redirect("/")

    return render_template("create.html")

if __name__ == "__main__":
    app.run(debug=True)
