import TextField from '@mui/material/TextField';
import {MenuItem} from "@mui/material";
import {useState} from "react";

const fontStyle = {
    style: {
        color: "white",
        fontFamily: "Rajdhani, sans-serif"
    }
}

const inputStyle = {
    "& .MuiFilledInput-root": {
        backgroundColor: "transparent", // optional, remove default grey
        borderBottom: "1px solid white",
        "&:hover": {
            borderBottom: "2px solid white",
        },
        "&.Mui-focused": {
            borderBottom: "2px solid white",
        },
    },
}

export default function NewTask({exit, appendCurrentTask}) {
    const [type, setType] = useState(null);
    const [name, setName] = useState(null);
    const [minutes, setMinutes] = useState(null);
    const [seconds, setSeconds] = useState(null);

    const addTaskOrBreak = () => {
        if (type && name && minutes && seconds) {
            appendCurrentTask(type, name, Number(minutes)*60 + Number(seconds));
            exit();
        }
        else {
            alert("Please fill all the fields");
        }
    }

    return (
        <div
            className={`bg-transparent z-50 w-full h-full absolute top-0 left-0 flex items-center justify-center rajdhani text-white`}>
            <div
                className={`bg-[#4D4D4D]/50 backdrop-blur-[2px] rounded-3xl mt-4 flex flex-col justify-center items-center px-12 py-7`}>
                <div className={`font-black text-3xl px-15 py-6`}>
                    Add Task / Break
                </div>

                <TextField id="filled-basic"
                           label="Type"
                           variant="filled"
                           InputProps={fontStyle}
                           InputLabelProps={fontStyle}
                           sx={inputStyle}
                           fullWidth
                           select
                           required
                           onChange={(e) => setType(e.target.value)}
                >
                    <MenuItem key={"task"} value={"task"}>Task</MenuItem>
                    <MenuItem key={"break"} value={"break"}>Break</MenuItem>

                </TextField>

                <br/>

                <TextField id="filled-basic"
                           label="Name"
                           variant="filled"
                           InputProps={fontStyle}
                           InputLabelProps={fontStyle}
                           sx={inputStyle}
                           fullWidth
                           required
                           onChange={(e) => setName(e.target.value)}
                />

                <br/>

                <div className={`flex justify-center items-center w-full gap-2`}>
                    <TextField id="filled-basic"
                               label="Minutes"
                               variant="filled"
                               type="number"
                               InputProps={fontStyle}
                               InputLabelProps={fontStyle}
                               sx={inputStyle}
                               fullWidth
                               required
                               onChange={(e) => setMinutes(e.target.value)}
                    />

                    <TextField id="filled-basic"
                               label="Seconds"
                               variant="filled"
                               type="number"
                               InputProps={fontStyle}
                               InputLabelProps={fontStyle}
                               sx={inputStyle}
                               fullWidth
                               required
                               onChange={(e) => setSeconds(e.target.value)}
                    />
                </div>


                <div className={`flex justify-center items-center w-full pt-12 pb-2`}>
                    <div
                        className={`bg-white text-black basis-1/2 text-center p-3 rounded-xl mx-2 font-bold text-2xl cursor-pointer`}
                        onClick={() => addTaskOrBreak()}>
                        Add
                    </div>

                    <div
                        className={`bg-white text-black basis-1/2 text-center p-3 rounded-xl mx-2 font-bold text-2xl cursor-pointer`}
                        onClick={() => exit()}>
                        Cancel
                    </div>
                </div>
            </div>
        </div>
    );
}