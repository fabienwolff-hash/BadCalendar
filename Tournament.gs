/**
 * Crée un objet Tournament.
 *
 * @returns {Object}
 */
function createTournament() {
  return {
    tournamentId: "",

    title: "",
    type: "",
    scope: "",
    organizer: "",

    registration: {
      openingDate: null,
      closingDate: null,
      url: ""
    },

    programs: []
  };
}