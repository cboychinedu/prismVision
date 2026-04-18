// Importing the necessary modules 
import { Fragment } from "react";
import { Fade } from "react-awesome-reveal";

// Define an interface for the props 
interface AlertProps {
    show: boolean;
    message: string;
    type: string;
    setAlert: (val: any) => void;
}

// Creating the alert box component 
const AlertBox = ({ show, message, type, setAlert }: AlertProps) => {
    // Rendering the alert box component 
    return (
        <Fragment>
            <div className="fixed top-0 left-0 z-[100] w-full h-fit max-w-sm p-4 mt-[80px]">
                <Fade direction='left'>
                    <div className={`p-4 rounded-2xl border backdrop-blur-md shadow-2xl flex items-center space-x-4 ${type === 'success'
                        ? 'bg-emerald-500 border-emerald-500/50 text-white'
                        : 'bg-rose-500 border-rose-500/50 text-white'
                        }`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${type === 'success' ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'
                            }`}>
                            {type === 'success' ? '✓' : '!'}
                        </div>

                        <div className="flex-1">
                            <p className="font-medium text-sm sm:text-base leading-tight">
                                {message}
                            </p>
                        </div>

                        <button
                            onClick={() => setAlert({ show: false })}
                            className="ml-auto text-white/50 hover:text-white transition-colors"
                            aria-label="Close alert"
                        >
                            ✕
                        </button>
                    </div>
                </Fade>
            </div>
        </Fragment>
    )
}

// Exporting the alert box component 
export default AlertBox; 