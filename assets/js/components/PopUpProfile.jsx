import React, {useEffect} from "react";
import useState from "react-usestateref";
import Popup from "../Popup";
import AddField from "./AddField";
import {useTranslation} from "react-i18next";

//style
import '../../../styles/popUpProfile.css'
import star from '../../../images/star.png'
import greyStar from '../../../images/star_grey.png'
import iconInterview from "../../../images/interview.png";

function PopUpProfile(item) {

	const [isOpen, setIsOpen] = useState(false);
	const [identifiant, setIdentifiant] = useState(0)
	const [profile, setProfile] = useState(item.item)
	const pages = [
		{
			id: "cv", name: "CV", div: "divcv"
		},
		{
			id: "skill", name: "Competences", div: "divskill"
		},
		{
			id: "contact", name: "Contact", div: "divcontact"
		},
		{
			id: "state", name: "Etat du recrutement", div: "divstate"
		}
	]
	const interviews = [
		{}
	]
	const {t} = useTranslation();
	let formationList = []
	let experienceList = []

	function switchView(page, div) {
		pages.map(item => {
			document.getElementById(item.id).className = "";
			document.getElementById(item.div).style.display = "none"

		})
		document.getElementById(page).className = "current";
		document.getElementById(div).style.display = "block"


	}

	// Permet de mettre les date de debut et de fin a "YYY-MM-DD"
	// A modifier pour le remettre directement dans le return de PopupProfile s'il est possible de melanger code et html dans un .map
	function getFormationList() {
		profile.formations.map(
			formation => {
				// Transformer les strings de dates en vraies dates
				var start = new Date(formation.DateStart);
				start = start.toISOString().split('T')[0]
				var end = new Date(formation.DateEnd);
				end = end.toISOString().split('T')[0]

				// L'affichage dans le html
				formationList.push(
					<div key={formation.id} className="formation-item">
						<div className="ligne"><strong>{t("school")} : </strong>{formation.School}</div>
						<div className="ligne"><strong>{t("diploma")} : </strong>{formation.Diploma}</div>
						<div className="ligne"><strong>{t("field")} : </strong>{formation.FieldStudy}</div>
						<div className="ligne"><strong>{t("dateStart")} : </strong>{start}</div>
						<div className="ligne"><strong>{t("dateEnd")} : </strong>{end}</div>
						<div className="ligne"><strong>{t("description")} : </strong>{formation.Description}</div>
						<div className="separateur"/>
					</div>)
			}
		)
		return formationList;
	}

	function getExpericenceList(){
		profile.experiences.map(experience => {
			// Transformer les strings de dates en vraies dates
			var start = new Date(experience.DateStart);
			start = start.toISOString().split('T')[0]

			experienceList.push(
				<div key={experience.id} className="experience-item">
					<div className="ligne"><strong>{t("title")} : </strong>{experience.Title}</div>
					<div className="ligne"><strong>{t("company")} : </strong>{experience.Company}</div>
					<div className="ligne"><strong>{t("place")} : </strong>{experience.Place}</div>
					<div className="ligne"><strong>{t("dateStart")} : </strong>{start}</div>
					<div className="ligne"><strong>{t("strongpoints")} : </strong>{experience.Strongpoint}</div>
					<div className="ligne"><strong>{t("weakpoints")} : </strong>{experience.Weakpoint}</div>
					<div className="ligne"><strong>{t("description")} : </strong>{experience.Description}</div>
					<div className="separateur"/>
				</div>)

		})
		return experienceList;
	}


	// Permet d'afficher le bon nombre d'etoiles en fonction du niveau
	function getStars(stars) {
		let starList = [];
		for (let i = 1; i <= 5; i++) {
			if (i <= stars) {
				starList.push(<img className="star" src={star} alt=""/>)
			} else {
				starList.push(<img className="star" src={greyStar} alt=""/>)
			}
		}
		return (
			<div className="stars">
				{starList}
			</div>
		)
	}

	function getInterviews(interviews) {
		console.log(interviews.length)
		let listInterviewIcon = []
		let listInterviews = []
		let classe
		let test = 1

		for (let i = 0; i <= 3; i++) {
			if (interviews.length == i) {
				for (let j = 1; j <= i; j++) {
					listInterviewIcon.push(
						<img id="interviewIcon" className="enabled" src={iconInterview} alt="" onClick={() => switchInterviews(j)}/>
					)
					if (j === 1){
						classe = "displayed";
					}else{
						classe = "nodisplayed"
					}
					listInterviews.push(
							<div id={j} className={classe}>
								<div className="ligne"><strong>{t("interview")} : </strong>{interviews[j-1].InterviewType}</div>
								<div className="ligne"><strong>{t("candidateMeeting")} :</strong>{new Date(interviews[j-1].DateMeeting).toISOString().split('T')[0]}
								</div>
								<div className="ligne"><strong>{t("globalReview")} :</strong>{interviews[j-1].Review}</div>
								<div className="ligne"><strong>{t("description")} :</strong>{interviews[j-1].Description}</div>
							</div>
					);
				}
				for (let h = i+1; h <= 3; h++) {
					listInterviewIcon.push(
						<img id="interviewIcon" src={iconInterview} alt="" onClick={() => switchInterviews(h)}/>
					)
					if (i === 0){
						if (test === 1){
							listInterviews.push(
								<div id={i+h} className="displayed">
									<p>{t("noInterviews")}</p>
								</div>
							)
							test = 0
						}else{
							listInterviews.push(
								<div id={i+h} className="nodisplayed">
									<h1>{t("noInterviews")}</h1>
								</div>
							)
						}
					}else{
						listInterviews.push(
							<div id={h} className="nodisplayed">
								<h1>{t("noInterviews")}</h1>
							</div>
						)
					}

				}
			}
		}

		return (
			<div id="interview">
				<div id="interviewicon">
					{listInterviewIcon}
				</div>
				<div id="interviewinfo">
					{listInterviews}
				</div>
			</div>
		)
	}

	function switchInterviews(divId) {
		document.getElementById("1").style.display = "none"
		document.getElementById("2").style.display = "none"
		document.getElementById("3").style.display = "none"
		document.getElementById(divId).style.display = "block"
	}

	// function getContract


	return (
		<>
			<h1 className="popup-name">{profile.Firstname} {profile.Lastname}</h1>
			<ul className="nav">
				{/*{pages.map(page =>*/}
				{/*	<li id={page.id} onClick={() => switchView(page.id, page.div)}>{page.name}</li>*/}
				{/*)}*/}
				<li id="cv" className="current" onClick={() => switchView("cv", "divcv")}>CV</li>
				<li id="skill" onClick={() => switchView("skill", "divskill")}>Competences</li>
				<li id="contact" onClick={() => switchView("contact", "divcontact")}>Contact</li>
				<li id="state" onClick={() => switchView("state", "divstate")}>Etat du recrutement</li>
			</ul>
			<div id="divcv">
				<div className="experiences">
					<p>{t("experiences")} :</p>
					<div className="experience">
						{getExpericenceList()}
					</div>
				</div>
				<div className="formations">
					<p>{t("formations")} :</p>
					<div className="formation">
						{getFormationList()}
					</div>
				</div>
			</div>
			<div id="divskill">
				{profile.skillAssignations.map(skill => (
					<div className="skill" key={skill.id}>
						<p>{skill.IdSkillAssignation.Field} - {skill.IdSkillAssignation.Caption}</p>
						{getStars(skill.Level)}
					</div>
				))}
			</div>
			<div id="divcontact">
				<div className="ligne"><strong>{t("phone")} : </strong>{profile.Phone}</div>
				<div className="ligne"><strong>{t("address")} : </strong>{profile.Address}</div>
				<div className="ligne"><strong>{t("email")} : </strong>{profile.Email}</div>
				<div className="ligne"><strong>Linkedin : </strong><a href="#">{profile.Linkedin}</a></div>
				<div className="ligne"><strong>Viadeo : </strong><a href="#">{profile.Viadeo}</a></div>
			</div>
			<div id="divstate">
				<div className="TakeContact">
					<h2>Informations du contact :</h2>
					<strong>Prise de contact le :</strong>{new Date(profile.recruitment.ContactDate).toISOString().split('T')[0]}
					<br/>
					<strong>Méthode de prise de contact :</strong>{profile.recruitment.ContactMethod}
				</div>
				<div className="interviewList">
					<h2>Informations des interviews :</h2>
					{getInterviews(profile.recruitment.interviews)}
				</div>
				<div className="contractinfo">
					<h2>Informations du contrat :</h2>
					<strong>Contrat signé le : </strong>{new Date(profile.recruitment.ContractDate).toISOString().split('T')[0]}
					<br/>
					<strong>Informations supplémentaires du contrat : </strong>{profile.recruitment.ContractDescription}
				</div>
			</div>
		</>
	);
}

export default PopUpProfile;