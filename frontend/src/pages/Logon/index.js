import React, { useState } from "react";
import { FiLogIn } from "react-icons/fi";
import "./styles.css";
import heroes from "../../assets/heroes.png";
import logo from "../../assets/logo.svg";
import { Link, useHistory } from "react-router-dom";
import api from "../../services/api";

export default function Logon() {
  const [id, setId] = useState("");
  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await api.post("sessions", { id });
      localStorage.setItem("@bethehero/ongId", id);
      localStorage.setItem("@bethehero/ongName", response.data.name);
      history.push("/profile");
    } catch (err) {
      alert("Falha no Login, tente novamente");
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logo} alt="Be The Hero" />

        <form onSubmit={handleLogin}>
          <h1>Faça seu logon</h1>

          <input
            placeholder="Sua ID"
            value={id}
            onChange={e => setId(e.target.value)}
          />
          <button className="button" type="submit">
            Entrar
          </button>

          <Link to="/register" className="backlink">
            <FiLogIn size="16" color="#e02041" />
            Não tenho cadastro
          </Link>
        </form>
      </section>
      <img src={heroes} alt="Heroes" />
    </div>
  );
}