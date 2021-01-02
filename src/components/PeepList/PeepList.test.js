import React from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";
import PeepList from './PeepList.js';

 describe("PeepList", () => {

  beforeAll(() => {
    jest.mock("axios")
  })

  afterAll(() => {
    jest.resetAllMocks()
  })

  test('renders without crashing', () => {
    const peepListContainer = document.createElement("div");
    ReactDOM.render(<PeepList />, peepListContainer);
    expect(peepListContainer.querySelector("p").textContent).toBe("OneTwoThree");
  });

  test('makes a get request', async () => {
    let axiosSpy = jest.spyOn(axios, "get")
    const peepListContainer = document.createElement("div");
    await ReactDOM.render(<PeepList />, peepListContainer)
    expect(axiosSpy).toHaveBeenCalledWith("https://chitter-backend-api-v2.herokuapp.com/peeps")
  });

 }) 