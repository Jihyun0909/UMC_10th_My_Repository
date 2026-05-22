export const responseFromReviews = (reviews) => {
    return {
        data: reviews,
        pagination: {
            cursor: reviews.length > 0 ? reviews[reviews.length - 1].id : null,
        },
    };
};
//# sourceMappingURL=store.dtos.js.map