const { createMachine, actions, interpret } = XState;

var machine_actions = {
  init: () => {},
  loaded: () => {},
  
}

const machine = 
/** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOgEl9cAXAYgBkB5AQQBEBRFgbQAYBdRUAAcA9rGq5h+ASAAeiAIwA2EooCcigMzzV3bgCYArAHYNAFkUAaEAE9EerSSMGzR-QYPzuOgBwBfX1ZoWHiEpADqwgBOADYQNGwAcgAqbABKALQAQmQMPPxIICJiVBJSBXII8t7Kivpa3E6qqs7OVrYIGnrK1fIGik5G5qZOBv6BGDgExCSZEjSpbEkAqqkJ6QASDACybHnSReKS0hXyriTeGu4aXgbcp3cGbYgaJiRN3q7evXre3O5jICCk1CJAiMTiiRSGQACqkGAApNgAYSSAGU9gUDiUjuUFCQvHpzIoupoNBpmk4nghbt5ztUXt53L1TNVFACgSFptDIsIAFZgTBUWDzRYrNabHYYoSiQ5lUAVdJdfEaD5GTymO7yUx9Kna2lqwmqcyeL6Moz+AIgfDCCBwaQcqZEfYy7Fy2SIdKDZWq9Wa7VGKnuRyKU5qi61X6qeTsiac0gUajO4qlY6IbhUrUaEiGQyh3TaZwx4KO0FRWJJ2WphDpbjnPRG-pGEymF6PGzPa7Zzz2U5fXQGapF4HTWbCCuuqtmPRvDSKDW-UyqQzcOdUsm1vTdlt6ZfqQeWh0g7l8gVC8cp3EIeznJnmAyqF6zpsB9vU7ymEidbX500ki2+IA */
createMachine(
{
    initial: "Init",
    states: {
      Init: {
        exit: "loaded",
        on: {
          LOADED: "World"
        }
      },

      World: {

        on: {
          "ENTER-BIO": "Bio",
          "ENTER-PROJECTS": "Projects"
        }
      },

      Bio: {
        entry: 'enter_bio',
        exit: 'leave_bio',
        on: {
          "RETURN-HOME": "World"
        }
      },

      Projects: {
        on: {
          "RETURN-HOME": "World"
        }
      }
    },
}, 
{
    actions: machine_actions
});
