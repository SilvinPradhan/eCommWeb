import React from 'react'
import zxcvbn from 'zxcvbn'
import {makeStyles, useTheme} from '@material-ui/core/styles';
import "./PasswordChecker.css"
import {Typography} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    password_strength_meter: {
        textAlign: "center"
    },
    password_strength_meter_label: {
        fontSize: "14px"
    },
    defaultPasswordMessage: {},
    typography: {
        color: "#7a7a7a"
    }
}))


const PasswordChecker = (
    {password}
) => {
    const passwordScore = zxcvbn(password);
    const classes = useStyles();

    const createPasswordLabel = (result) => {
        switch (result.score) {
            case 0:
                return 'Weak';
            case 1:
                return 'Weak';
            case 2:
                return 'Fair';
            case 3:
                return 'Good';
            case 4:
                return 'Strong';
            default:
                return 'Weak';
        }
    }

    return (
        <div className={classes.password_strength_meter}>
            <progress
                className={`password-strength-meter-progress strength-${createPasswordLabel(passwordScore)}`}
                value={passwordScore.score} max={4}
            />
            <br/>
            <label
                className={`${classes.password_strength_meter_label}`}
            >
                {password ? (<>
                    <strong>
                        Password Strength:
                    </strong>
                    {createPasswordLabel(passwordScore)}
                </>) : (
                    <>
                        <div className={classes.defaultPasswordMessage}>
                            <h7 className={classes.typography}>Is your Password Strong enough?</h7>
                        </div>
                    </>
                )}
            </label>
        </div>
    )
}

export default PasswordChecker
