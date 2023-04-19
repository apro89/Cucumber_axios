const {
    defineSupportCode
  } = require('cucumber');
  const axios = require('axios');
  var expect = require('expect');
  let get_response;
  let punk_url = "https://api.punkapi.com/v2";

  defineSupportCode(({ Given, Then, defineStep }) => {
    const And = defineStep;

    Given('I call the punk api with beer id {int}', async function (beerID) { 
      get_response = await axios.get(`${punk_url}/beers/${beerID}`).then((response)=>{
        return response;
      }).catch((response) => {  
        return response.response;
      });
    });
  
    Then('I expect a {int} status response', async function (status) {
      expect(await get_response.status).toEqual(status)
    });
  
    And('The malt is {string}', async function (malt) {
      expect(await get_response.data[0].ingredients.malt[0].name).toEqual(malt);
    });

    And('The malt value is {float} and the unit is {string}', async function (amountValue, amountunit) {
      expect(await get_response.data[0].ingredients.malt[0].amount.value).toEqual(amountValue);
      expect(await get_response.data[0].ingredients.malt[0].amount.unit).toEqual(amountunit);
    });

  })



