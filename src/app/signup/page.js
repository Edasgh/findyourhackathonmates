"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Signup() {
  // access password & confirm password value
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // to get if the password & confirm password are the same
  const [isSame, setIsSame] = useState(true);

  // to show floating labels if focused on input fields
  const [isNameFocus, setIsNameFocus] = useState(false);
  const [isPasswordFocus, setIsPasswordFocus] = useState(false);
  const [isCPasswordFocus, setIsCPasswordFocus] = useState(false);
  const [isEmailFocus, setIsEmailFocus] = useState(false);

  const [isghFocus, setIsghFocus] = useState(false);
  const [isDescFocus, setIsDescFocus] = useState(false);
  const [isSkillsFocus, setIsSkillsFocus] = useState(false);
  // to show / hide the password
  const [isShown, setIsShown] = useState(false);
  const [isCPShown, setIsCPShown] = useState(false);

  //to get the token from localStorage
  const [token, setToken] = useState(null);
  //router
  const router = useRouter();

  function matchWPassword(e) {
    if (e.target.value === password) {
      setIsSame(true);
    } else {
      setIsSame(false);
    }
  }

  function matchWCPassword(e) {
    if (e.target.value === confirmPassword) {
      setIsSame(true);
    } else {
      setIsSame(false);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSame) {
      try {
        const data = new FormData(e.currentTarget);
        const name = data.get("name");
        const country = data.get("country");
        const bio = data.get("bio");
        const githubID = data.get("githubID");
        const skills = data.get("skills");
        const email = data.get("email");
        const password = data.get("password");

        const skillsArr = [...skills.split(",")];

        if (skills.includes(",") && skillsArr.length >= 5) {
          const response = await fetch("/api/signup", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              name,
              email,
              githubID,
              bio,
              skills: skillsArr,
              country,
              password,
            }),
          });

          if (response.status === 201) {
            toast.success("Signed Up Successfully!");
            setInterval(() => {
              router.push("/login");
            }, 3000);
          }
        } else {
          toast.error(
            "Skills should be ',' separated and Atleast 5 skills should be added!"
          );
        }
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      toast.error("Password & Confirm Password should be same");
    }
  };

  const onFocusStyle = {
    padding: "0 0.5rem",
    color: " var(--text-secondary)",
    transform: " translate(-10px, -17px) scale(0.8)",
    zIndex: "8",
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedToken = localStorage.getItem("token");
      setToken(savedToken);
      if (savedToken) {
        router.push("/");
      }
    }
  }, []);

  const getStyle = (isFocus) => {
    return isFocus ? onFocusStyle : { display: "inherit" };
  };

  return (
    <>
      <ToastContainer position="bottom-left" theme="dark" />
      <div className="main-div w-1/3 max-[900px]:w-full  p-7 m-auto mt-10 flex flex-col gap-2 justify-center items-center">
        <h1 className="text-center section-title text-textPrimary poppins-semibold text-[28px]">
          Join The Community Now!
        </h1>
        <form onSubmit={handleSubmit} className="login-signup-form">
          <div className="flex flex-wrap gap-2">
            <div className="input-div">
              <input
                type="text"
                onFocus={() => {
                  setIsNameFocus(true);
                }}
                onBlur={(e) => {
                  if (e.target.value === "") {
                    setIsNameFocus(false);
                  } else {
                    setIsNameFocus(true);
                  }
                }}
                id="name"
                name="name"
                aria-describedby="name"
                className="text-textPrimary"
                required
              />
              <label
                htmlFor="name"
                className="labelLine"
                style={getStyle(isNameFocus)}
              >
                Name
              </label>
            </div>

            <div className="input-div">
              <select
                className="form-select text-textSecondary"
                autoComplete="country"
                id="country"
                name="country"
                onChange={(e) => {
                  e.preventDefault();
                }}
                required
              >
                <option value="">Choose Country</option>
                <option value="AF">Afghanistan</option>
                <option value="AX">Åland Islands</option>
                <option value="AL">Albania</option>
                <option value="DZ">Algeria</option>
                <option value="AS">American Samoa</option>
                <option value="AD">Andorra</option>
                <option value="AO">Angola</option>
                <option value="AI">Anguilla</option>
                <option value="AQ">Antarctica</option>
                <option value="AG">Antigua and Barbuda</option>
                <option value="AR">Argentina</option>
                <option value="AM">Armenia</option>
                <option value="AW">Aruba</option>
                <option value="AU">Australia</option>
                <option value="AT">Austria</option>
                <option value="AZ">Azerbaijan</option>
                <option value="BS">Bahamas</option>
                <option value="BH">Bahrain</option>
                <option value="BD">Bangladesh</option>
                <option value="BB">Barbados</option>
                <option value="BY">Belarus</option>
                <option value="BE">Belgium</option>
                <option value="BZ">Belize</option>
                <option value="BJ">Benin</option>
                <option value="BM">Bermuda</option>
                <option value="BT">Bhutan</option>
                <option value="BO">Bolivia (Plurinational State of)</option>
                <option value="BA">Bosnia and Herzegovina</option>
                <option value="BW">Botswana</option>
                <option value="BV">Bouvet Island</option>
                <option value="BR">Brazil</option>
                <option value="IO">British Indian Ocean Territory</option>
                <option value="BN">Brunei Darussalam</option>
                <option value="BG">Bulgaria</option>
                <option value="BF">Burkina Faso</option>
                <option value="BI">Burundi</option>
                <option value="CV">Cabo Verde</option>
                <option value="KH">Cambodia</option>
                <option value="CM">Cameroon</option>
                <option value="CA">Canada</option>
                <option value="BQ">Caribbean Netherlands</option>
                <option value="KY">Cayman Islands</option>
                <option value="CF">Central African Republic</option>
                <option value="TD">Chad</option>
                <option value="CL">Chile</option>
                <option value="CN">China</option>
                <option value="CX">Christmas Island</option>
                <option value="CC">Cocos (Keeling) Islands</option>
                <option value="CO">Colombia</option>
                <option value="KM">Comoros</option>
                <option value="CG">Congo</option>
                <option value="CD">Congo, Democratic Republic of the</option>
                <option value="CK">Cook Islands</option>
                <option value="CR">Costa Rica</option>
                <option value="HR">Croatia</option>
                <option value="CU">Cuba</option>
                <option value="CW">Curaçao</option>
                <option value="CY">Cyprus</option>
                <option value="CZ">Czech Republic</option>
                <option value="CI">Côte d'Ivoire</option>
                <option value="DK">Denmark</option>
                <option value="DJ">Djibouti</option>
                <option value="DM">Dominica</option>
                <option value="DO">Dominican Republic</option>
                <option value="EC">Ecuador</option>
                <option value="EG">Egypt</option>
                <option value="SV">El Salvador</option>
                <option value="GQ">Equatorial Guinea</option>
                <option value="ER">Eritrea</option>
                <option value="EE">Estonia</option>
                <option value="SZ">Eswatini (Swaziland)</option>
                <option value="ET">Ethiopia</option>
                <option value="FK">Falkland Islands (Malvinas)</option>
                <option value="FO">Faroe Islands</option>
                <option value="FJ">Fiji</option>
                <option value="FI">Finland</option>
                <option value="FR">France</option>
                <option value="GF">French Guiana</option>
                <option value="PF">French Polynesia</option>
                <option value="TF">French Southern Territories</option>
                <option value="GA">Gabon</option>
                <option value="GM">Gambia</option>
                <option value="GE">Georgia</option>
                <option value="DE">Germany</option>
                <option value="GH">Ghana</option>
                <option value="GI">Gibraltar</option>
                <option value="GR">Greece</option>
                <option value="GL">Greenland</option>
                <option value="GD">Grenada</option>
                <option value="GP">Guadeloupe</option>
                <option value="GU">Guam</option>
                <option value="GT">Guatemala</option>
                <option value="GG">Guernsey</option>
                <option value="GN">Guinea</option>
                <option value="GW">Guinea-Bissau</option>
                <option value="GY">Guyana</option>
                <option value="HT">Haiti</option>
                <option value="HM">Heard Island and Mcdonald Islands</option>
                <option value="HN">Honduras</option>
                <option value="HK">Hong Kong</option>
                <option value="HU">Hungary</option>
                <option value="IS">Iceland</option>
                <option value="IN">India</option>
                <option value="ID">Indonesia</option>
                <option value="IR">Iran</option>
                <option value="IQ">Iraq</option>
                <option value="IE">Ireland</option>
                <option value="IM">Isle of Man</option>
                <option value="IL">Israel</option>
                <option value="IT">Italy</option>
                <option value="JM">Jamaica</option>
                <option value="JP">Japan</option>
                <option value="JE">Jersey</option>
                <option value="JO">Jordan</option>
                <option value="KZ">Kazakhstan</option>
                <option value="KE">Kenya</option>
                <option value="KI">Kiribati</option>
                <option value="KP">Korea, North</option>
                <option value="KR">Korea, South</option>
                <option value="XK">Kosovo</option>
                <option value="KW">Kuwait</option>
                <option value="KG">Kyrgyzstan</option>
                <option value="LA">Lao People's Democratic Republic</option>
                <option value="LV">Latvia</option>
                <option value="LB">Lebanon</option>
                <option value="LS">Lesotho</option>
                <option value="LR">Liberia</option>
                <option value="LY">Libya</option>
                <option value="LI">Liechtenstein</option>
                <option value="LT">Lithuania</option>
                <option value="LU">Luxembourg</option>
                <option value="MO">Macao</option>
                <option value="MK">Macedonia North</option>
                <option value="MG">Madagascar</option>
                <option value="MW">Malawi</option>
                <option value="MY">Malaysia</option>
                <option value="MV">Maldives</option>
                <option value="ML">Mali</option>
                <option value="MT">Malta</option>
                <option value="MH">Marshall Islands</option>
                <option value="MQ">Martinique</option>
                <option value="MR">Mauritania</option>
                <option value="MU">Mauritius</option>
                <option value="YT">Mayotte</option>
                <option value="MX">Mexico</option>
                <option value="FM">Micronesia</option>
                <option value="MD">Moldova</option>
                <option value="MC">Monaco</option>
                <option value="MN">Mongolia</option>
                <option value="ME">Montenegro</option>
                <option value="MS">Montserrat</option>
                <option value="MA">Morocco</option>
                <option value="MZ">Mozambique</option>
                <option value="MM">Myanmar (Burma)</option>
                <option value="NA">Namibia</option>
                <option value="NR">Nauru</option>
                <option value="NP">Nepal</option>
                <option value="NL">Netherlands</option>
                <option value="AN">Netherlands Antilles</option>
                <option value="NC">New Caledonia</option>
                <option value="NZ">New Zealand</option>
                <option value="NI">Nicaragua</option>
                <option value="NE">Niger</option>
                <option value="NG">Nigeria</option>
                <option value="NU">Niue</option>
                <option value="NF">Norfolk Island</option>
                <option value="MP">Northern Mariana Islands</option>
                <option value="NO">Norway</option>
                <option value="OM">Oman</option>
                <option value="PK">Pakistan</option>
                <option value="PW">Palau</option>
                <option value="PS">Palestine</option>
                <option value="PA">Panama</option>
                <option value="PG">Papua New Guinea</option>
                <option value="PY">Paraguay</option>
                <option value="PE">Peru</option>
                <option value="PH">Philippines</option>
                <option value="PN">Pitcairn Islands</option>
                <option value="PL">Poland</option>
                <option value="PT">Portugal</option>
                <option value="PR">Puerto Rico</option>
                <option value="QA">Qatar</option>
                <option value="RE">Reunion</option>
                <option value="RO">Romania</option>
                <option value="RU">Russian Federation</option>
                <option value="RW">Rwanda</option>
                <option value="BL">Saint Barthelemy</option>
                <option value="SH">Saint Helena</option>
                <option value="KN">Saint Kitts and Nevis</option>
                <option value="LC">Saint Lucia</option>
                <option value="MF">Saint Martin</option>
                <option value="PM">Saint Pierre and Miquelon</option>
                <option value="VC">Saint Vincent and the Grenadines</option>
                <option value="WS">Samoa</option>
                <option value="SM">San Marino</option>
                <option value="ST">Sao Tome and Principe</option>
                <option value="SA">Saudi Arabia</option>
                <option value="SN">Senegal</option>
                <option value="RS">Serbia</option>
                <option value="CS">Serbia and Montenegro</option>
                <option value="SC">Seychelles</option>
                <option value="SL">Sierra Leone</option>
                <option value="SG">Singapore</option>
                <option value="SX">Sint Maarten</option>
                <option value="SK">Slovakia</option>
                <option value="SI">Slovenia</option>
                <option value="SB">Solomon Islands</option>
                <option value="SO">Somalia</option>
                <option value="ZA">South Africa</option>
                <option value="GS">
                  South Georgia and the South Sandwich Islands
                </option>
                <option value="SS">South Sudan</option>
                <option value="ES">Spain</option>
                <option value="LK">Sri Lanka</option>
                <option value="SD">Sudan</option>
                <option value="SR">Suriname</option>
                <option value="SJ">Svalbard and Jan Mayen</option>
                <option value="SE">Sweden</option>
                <option value="CH">Switzerland</option>
                <option value="SY">Syria</option>
                <option value="TW">Taiwan</option>
                <option value="TJ">Tajikistan</option>
                <option value="TZ">Tanzania</option>
                <option value="TH">Thailand</option>
                <option value="TL">Timor-Leste</option>
                <option value="TG">Togo</option>
                <option value="TK">Tokelau</option>
                <option value="TO">Tonga</option>
                <option value="TT">Trinidad and Tobago</option>
                <option value="TN">Tunisia</option>
                <option value="TR">Turkey (Türkiye)</option>
                <option value="TM">Turkmenistan</option>
                <option value="TC">Turks and Caicos Islands</option>
                <option value="TV">Tuvalu</option>
                <option value="UM">U.S. Outlying Islands</option>
                <option value="UG">Uganda</option>
                <option value="UA">Ukraine</option>
                <option value="AE">United Arab Emirates</option>
                <option value="GB">United Kingdom</option>
                <option value="US">United States</option>
                <option value="UY">Uruguay</option>
                <option value="UZ">Uzbekistan</option>
                <option value="VU">Vanuatu</option>
                <option value="VA">Vatican City Holy See</option>
                <option value="VE">Venezuela</option>
                <option value="VN">Vietnam</option>
                <option value="VG">Virgin Islands, British</option>
                <option value="VI">Virgin Islands, U.S</option>
                <option value="WF">Wallis and Futuna</option>
                <option value="EH">Western Sahara</option>
                <option value="YE">Yemen</option>
                <option value="ZM">Zambia</option>
                <option value="ZW">Zimbabwe</option>
              </select>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="input-div">
              <input
                type="email"
                onFocus={() => {
                  setIsEmailFocus(true);
                }}
                onBlur={(e) => {
                  if (e.target.value === "") {
                    setIsEmailFocus(false);
                  } else {
                    setIsEmailFocus(true);
                  }
                }}
                id="email"
                name="email"
                aria-describedby="emailSignup"
                className="text-textPrimary"
                required
              />
              <label
                htmlFor="email"
                className="labelLine"
                style={getStyle(isEmailFocus)}
              >
                Email
              </label>
            </div>
            <div className="input-div">
              <input
                type="text"
                onFocus={() => {
                  setIsghFocus(true);
                }}
                onBlur={(e) => {
                  if (e.target.value === "") {
                    setIsghFocus(false);
                  } else {
                    setIsghFocus(true);
                  }
                }}
                id="githubID"
                name="githubID"
                aria-describedby="githubID"
                className="text-textPrimary"
                required
              />
              <label
                htmlFor="githubID"
                className="labelLine"
                style={getStyle(isghFocus)}
              >
                Github ID
              </label>
            </div>
          </div>
          <span className="text-xs mb-2.5 text-textBgPrimaryHv hidden min-[480px]:block w-auto max-[480px]:max-w-56">
            *Skills should be ',' separated. Eg.: React.js, Node.js,
            Docker,MongoDB*
            <br />
            <br />
            *Atleast 5 skills should be added*
          </span>
          <div className="flex flex-wrap gap-2">
            <div className="input-div">
              <textarea
                onFocus={() => {
                  setIsDescFocus(true);
                }}
                onBlur={(e) => {
                  if (e.target.value === "") {
                    setIsDescFocus(false);
                  } else {
                    setIsDescFocus(true);
                  }
                }}
                id="bio"
                name="bio"
                aria-describedby="bio"
                className="text-textPrimary"
                minLength={50}
                required
              ></textarea>
              <label
                htmlFor="bio"
                className="labelLine"
                style={
                  isDescFocus ? { ...onFocusStyle } : { display: "inherit" }
                }
              >
                Bio
              </label>
            </div>
            <span className="text-xs mb-2.5 text-textBgPrimaryHv hidden max-[480px]:block w-auto max-[500px]:max-w-56">
              *Skills should be ',' separated. Eg.: React.js, Node.js,
              Docker,MongoDB*
              <br />
              <br />
              *Atleast 5 skills should be added*
            </span>
            <div className="input-div">
              <textarea
                onFocus={() => {
                  setIsSkillsFocus(true);
                }}
                onBlur={(e) => {
                  if (e.target.value === "") {
                    setIsSkillsFocus(false);
                  } else {
                    setIsSkillsFocus(true);
                  }
                }}
                id="skills"
                name="skills"
                aria-describedby="skills"
                className="text-textPrimary"
                title="Atleast 5 Skills should be added!"
                required
              ></textarea>
              <label
                htmlFor="skills"
                className="labelLine"
                style={getStyle(isSkillsFocus)}
              >
                Skills
              </label>
            </div>
          </div>
          <span
            className={
              isSame
                ? "text-xs mb-3.5 text-textSecondary opacity-100 w-auto max-[480px]:max-w-56"
                : "text-xs mb-3.5 text-[#fa6d6d] opacity-100 w-auto max-[480px]:max-w-56"
            }
          >
            *password & confirm password should be same*
          </span>
          <div className="flex flex-wrap gap-2">
            <div className="input-div">
              <input
                type={isShown ? "text" : "password"}
                className="form-control text-textPrimary"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  matchWCPassword(e);
                }}
                onFocus={(e) => {
                  setIsPasswordFocus(true);
                  matchWCPassword(e);
                }}
                onBlur={(e) => {
                  if (e.target.value === "") {
                    setIsPasswordFocus(false);
                  } else {
                    setIsPasswordFocus(true);
                  }

                  matchWCPassword(e);
                }}
                name="password"
                id="password"
                minLength={8}
                required
              />
              <span
                className={
                  "absolute top-2 left-[82%] w-[6.5rem] bg-transparent z-10"
                }
              >
                <FontAwesomeIcon
                  icon={isShown ? faEyeSlash : faEye}
                  className="cursor-pointer"
                  onClick={() => {
                    setIsShown(!isShown);
                    document.getElementById("password").focus();
                  }}
                />
              </span>
              <label
                htmlFor="password"
                className="labelLine"
                style={getStyle(isPasswordFocus)}
              >
                Password
              </label>
            </div>

            <div className="input-div">
              <input
                type={isCPShown ? "text" : "password"}
                className="form-control text-textPrimary"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  matchWPassword(e);
                }}
                onFocus={(e) => {
                  setIsCPasswordFocus(true);
                  matchWPassword(e);
                }}
                onBlur={(e) => {
                  if (e.target.value === "") {
                    setIsCPasswordFocus(false);
                  } else {
                    setIsCPasswordFocus(true);
                  }

                  matchWPassword(e);
                }}
                name="confirmPassword"
                id="confirmPassword"
                minLength={8}
                required
              />
              <span
                className={
                  "absolute top-2 left-[82%] w-[6.5rem] bg-transparent z-10"
                }
              >
                <FontAwesomeIcon
                  icon={isCPShown ? faEyeSlash : faEye}
                  className="cursor-pointer"
                  onClick={() => {
                    setIsCPShown(!isCPShown);
                    document.getElementById("confirmPassword").focus();
                  }}
                />
              </span>
              <label
                htmlFor="confirmPassword"
                className="labelLine"
                style={getStyle(isCPasswordFocus)}
              >
                Confirm Password
              </label>
            </div>
          </div>

          <p className="text-sm my-2 text-textPrimary">
            Already have an account ?{" "}
            <Link href="/login" className="text-textSecondary underline">
              LogIn
            </Link>
          </p>

          <button
            className="signup-submit text-textPrimary hover:bg-textBgPrimaryHv hover:text-black hover:text-center px-1 py-2 w-[10rem] border-[1px] rounded-md border-textBgPrimaryHv"
            type="submit"
            id="signup-btn"
          >
            Join
          </button>
        </form>
      </div>
    </>
  );
}
