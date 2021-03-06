import Head from "next/head";
import React, { FC, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import axios from "axios";
import Status from "../components/Status";
import Modal from "../components/Modal";

const Home = () => {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", accuracy: "low" });
  const [isLoading, setIsLoading] = useState(false);
  const [userMovieStatus, setUserMovieStatus] = useState("waiting");
  const [userRecStatus, setUserRecStatus] = useState("waiting");
  const [response, setResponse] = useState({
    message: "",
    status: -1,
  });
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    setForm({ ...form, [name]: value });
  };
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setUserMovieStatus("waiting");
    setUserRecStatus("waiting");
    try {
      setUserMovieStatus("working");
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_REC_API_ENDPOINT}/user/movies`,
        form,
        { timeout: 1000 * 60 * 5 } // 5 minutes
      );
      const data = res.data;
      if (data.status === 200) {
        setUserMovieStatus("success");
      } else {
        setUserMovieStatus("failed");
      }
      setResponse(data);
    } catch (err) {
      setUserMovieStatus("failed");
      try {
        setResponse(err.response.data);
      } finally {
        return;
      }
    }
    try {
      setUserRecStatus("working");
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_REC_API_ENDPOINT}/user/recommend`,
        form,
        { timeout: 1000 * 60 * 5 } // 5 minutes
      );
      const data = res.data;
      if (data.status === 200) {
        setUserRecStatus("success");
      } else {
        setUserMovieStatus("failed");
      }
      setResponse(data);
    } catch (err) {
      setUserRecStatus("failed");
      console.log(err);
      try {
        setResponse(err.response.data);
      } finally {
        return;
      }
    }
    setTimeout(() => {
      router.push(`/user/${form.username}`);
    }, 3000);
  };
  return (
    <>
      <Head>
        <title>Letterboxd Movie Recommendation</title>
      </Head>
      <Modal response={response}></Modal>
      <h1 className="main__header">Letterboxd Movie Recommendations</h1>
      <h2 className="main__subheader">
        Get personalized movie recommendations based from your Letterboxd
        profile
      </h2>
      <form className="recommendation-form" onSubmit={handleSubmit}>
        <fieldset className="form-items recommendation-items">
          <div className="form-group">
            <label htmlFor="username" className="form-label">
              Enter your Letterboxd Username
            </label>
            <input
              type="text"
              autoComplete="off"
              placeholder="Letterboxd Username"
              id="username"
              name="username"
              value={form.username}
              className="searchbar"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <p>How long do you want to wait?</p>
            <div onChange={handleChange}>
              <input
                type="radio"
                id="low"
                name="accuracy"
                value="low"
                defaultChecked={true}
                className="form-radio"
              />
              <label htmlFor="low" className="form-label">
                low
              </label>
              <input
                type="radio"
                id="med"
                name="accuracy"
                value="med"
                className="form-radio"
              />
              <label htmlFor="med" className="form-label">
                med
              </label>
              <input
                type="radio"
                id="high"
                name="accuracy"
                value="high"
                className="form-radio"
              />
              <label htmlFor="high" className="form-label">
                high
              </label>
            </div>
          </div>
          <button className="btn submit-btn" type="submit">
            Get Recommendations
          </button>
        </fieldset>
      </form>
      {isLoading && (
        <section className="status-container">
          <Status
            state={userMovieStatus}
            statusText={"Getting your watched movies from Letterboxd"}
          />
          <Status
            state={userRecStatus}
            statusText={"Creating your personal movie recommendations"}
          />
          {userMovieStatus === "success" && (
            <Link href={`/user/${form.username}`}>
              <a>Click here to go to your recommendations</a>
            </Link>
          )}
          {userMovieStatus === "success" && userRecStatus === "success" && (
            <h2>Recommendations are ready... Taking you there now</h2>
          )}
        </section>
      )}
      <Link href={"/user/mitchellv"}>
        Don't have a Letterboxd account? Try out this service with my account
        instead.
      </Link>
    </>
  );
};

export default Home;
