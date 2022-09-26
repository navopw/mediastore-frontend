import { useStore } from "../store/AppStore";

const TestPage = (_props: any) => {
    const number = useStore((state: any) => state.number);
    const increaseNumber = useStore((state: any) => state.increaseNumber);

    return (
        <div className="p-12">
            <div className="mb-6">
                <h1>Test Page</h1>
            </div>

            <div>
                <p>Number from Store: {number}</p>
                <button
                    className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none"
                    onClick={increaseNumber}
                >
                    Increase Number
                </button>
            </div>
        </div>
    );
};

export default TestPage;
