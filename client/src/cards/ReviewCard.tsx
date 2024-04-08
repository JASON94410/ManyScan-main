interface ReviewProps {
    review: {
      title: string;
      content: string;
      rating: number;
      createdAt: string;
    };
  }
  
  export const ReviewCard: React.FC<ReviewProps> = ({ review }) => {
    return (
      <div className="bg-white shadow-lg rounded-lg p-4 mb-4">
        <h3 className="text-lg font-semibold">{review.title}</h3>
        <p className="text-sm text-gray-600">{review.content}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-sm font-medium">Note: {review.rating}/5</span>
          <span className="text-sm text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    );
  };

  
  