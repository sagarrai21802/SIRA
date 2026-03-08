// Loading Screen Component
// Displays a loading spinner while the app initializes

export const LoadingScreen = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="flex flex-col items-center gap-4">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                <p className="text-gray-400 text-sm">Loading...</p>
            </div>
        </div>
    );
};

export default LoadingScreen;
