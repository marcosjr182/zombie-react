export default function reducer (
	state = {
		pagination: { currentPage: 1, maxNumberOfPages: 5 },
    modalIsOpen: false
	},
	action) {
		switch (action.type) {
			case "GO_TO_PAGE":
				return {
          ...state,
          pagination: {
            ...state.pagination,
            currentPage: action.payload
          }
        }
      default:
				return state;
		}
}
