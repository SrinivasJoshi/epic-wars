import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import Note from "./components/Note";
import Cards from "./components/Cards";

const Root = () => {
  return (
    <div className="flex flex-col">
      <Navbar />
      <>
        <section className="bg-primary flex flex-col items-center justify-evenly py-10">
          <h1 className="text-9xl text-secondary font-Handjet font-semibold mt-3">
            UNLEASH YOUR EPIC MIGHT
          </h1>
          <img
            src="/images/homeImg.gif"
            alt="Super Cool GIF"
            className="mt-12"
          />
          <h3 className="text-3xl text-white font-Handjet text-center mt-11">
            Experience the Thrill of Heroic Conquest with 'Samurai Showdown'
            <br /> The Game That Utilizes NFTs to Help You Seize Your Stellar
            Empire
          </h3>
          <div>
            <button className="text-2xl font-bold bg-secondary px-2 py-1 text-primary rounded-md font-Handjet mt-11">
              <a href="#tag1">Mint NFT</a>
            </button>

            <a href={"/lobby"}>
              <button className="ml-5 text-2xl font-bold bg-secondary px-2 py-1 text-primary rounded-md font-Handjet mt-11">
                Duel Now
              </button>
            </a>
          </div>
        </section>
        <section className="bg-primary flex flex-col items-center justify-evenly py-10 font-Montserrat min-h-screen">
          <h1
            className="text-4xl text-secondary font-bold font-Handjet"
            id="tag1"
          >
            Prepare for Battle
          </h1>
          <p className="text-white mt-4 w-3/6 text-center font-Montserrat">
            Step into the legendary battleground of 'Epic Arena,' where the
            smart contract is deployed on the enigmatic Oasis network,
            safeguarding the secrecy of NFT traits.
            <br />
            <br />
            In this cosmic showdown, every NFT holds seven mysterious
            properties, hidden from prying eyes until the moment of battle!
          </p>

          <h2 className="text-2xl text-secondary font-bold font-Handjet mt-6">
            Here are the Rules of Engagement:
          </h2>
          <ul className="list-none ml-6 text-white flex flex-col items-center">
            <li className="mt-3 text-lg">
              <span className="text-secondary font-bold">
                Connect Your Wallet:
              </span>{" "}
              To enter this epic arena, connect your digital wallet.
            </li>
            <li className="mt-3 text-lg">
              <span className="text-secondary font-bold">Mint Your NFT:</span>{" "}
              Warriors mint one free NFT, their ticket to the stars.
            </li>
            <li className="mt-3 text-lg">
              <span className="text-secondary font-bold">
                Challenge Fellow Explorers:
              </span>{" "}
              Master epic duels with your NFT weapon
            </li>
            <li className="mt-3 text-lg">
              <span className="text-secondary font-bold">
                Prepare for Combat:
              </span>{" "}
              Each battle is one thrilling round against your chosen foe.
            </li>
            <li className="mt-3 text-lg">
              <span className="text-secondary font-bold">
                Reveal the Secrets:
              </span>{" "}
              When the moment arrives, unveil your NFT's seven enigmatic traits.
            </li>
            <li className="mt-3 text-lg">
              <span className="text-secondary font-bold">
                Choose Your Weapon:
              </span>{" "}
              Contenders choose one attribute for their epic clash.
            </li>
          </ul>
        </section>
        <section className="bg-primary flex flex-col items-center justify-evenly py-10 font-Montserrat min-h-screen">
          <h1 className="text-4xl text-secondary font-bold font-Handjet mb-10">
            Pick your NFT
          </h1>

          <Note />
          <Cards />
        </section>
      </>
      <div id="detail" className="">
        <Outlet />
      </div>
    </div>
  );
};

export default Root;
