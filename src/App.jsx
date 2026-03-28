import React, { useEffect, useMemo, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './index.css';


const questionBank = [
  {
    id: 'shock-1',
    category: 'Shock',
    prompt: 'A 19-year-old male was stung multiple times by fire ants. He is experiencing obvious signs and symptoms of anaphylactic shock. You administer high-flow oxygen and give him epinephrine via intramuscular injection. Upon reassessment, you determine that his condition has not improved. You should:',
    options: [
      'transport him immediately and provide supportive care while en route.',
      'consider that he may actually be experiencing an acute asthma attack.',
      'repeat the epinephrine injection after consulting with medical control.',
      'request a paramedic unit that is stationed approximately 15 miles away.'
    ],
    answer: 2,
    explanation: 'Persistent anaphylaxis after the first IM epinephrine dose may require a repeat dose per protocol or after consulting medical control.'
  },
  {
    id: 'shock-2',
    category: 'Shock',
    prompt: 'A 20-year-old male has a large laceration to his wrist. He is holding a blood-soaked towel over the wound, but it continues to bleed rapidly. You should:',
    options: [
      'apply pressure to the brachial artery.',
      'apply a tourniquet proximal to the wrist.',
      'administer high-flow supplemental oxygen.',
      'wrap the towel with pressure bandages.'
    ],
    answer: 1,
    explanation: 'Severe extremity bleeding not controlled with direct pressure requires a tourniquet placed proximal to the wound.'
  },
  {
    id: 'shock-3',
    category: 'Shock',
    prompt: 'A 25-year-old unrestrained female struck the steering wheel with her chest when her car hit a tree while traveling at a high rate of speed. She has signs and symptoms of shock, which you suspect are the result of intrathoracic bleeding. Which intervention gives her the greatest chance for survival?',
    options: [
      'High-flow oxygen administration',
      'Full immobilization of her spine',
      'Intravenous fluid administration',
      'Rapid transport to a trauma center'
    ],
    answer: 3,
    explanation: 'Definitive care for major internal bleeding is rapid transport to a trauma center.'
  },
  {
    id: 'shock-4',
    category: 'Shock',
    prompt: 'A 27-year-old male was stabbed in the chest during a disagreement at a poker game. As you approach him, you see that a knife is impaled in his chest. Before you make physical contact with the patient, it is MOST important to:',
    options: [
      'form a general impression.',
      'call for an ALS ambulance.',
      'follow standard precautions.',
      'ask bystanders what happened.'
    ],
    answer: 2,
    explanation: 'Body substance isolation and standard precautions must come before patient contact.'
  },
  {
    id: 'shock-5',
    category: 'Shock',
    prompt: 'A 56-year-old male is found semiconscious. His respirations are rapid and shallow, pulse rapid and irregular, blood pressure low. Yesterday he complained of left arm pain and nausea. The MOST likely cause is:',
    options: [
      'acute myocardial infarction.',
      'dehydration from GI virus.',
      'severe septic hypoperfusion.',
      'a ruptured aortic aneurysm.'
    ],
    answer: 0,
    explanation: 'Left arm pain and nausea strongly suggest an MI, which may progress to cardiogenic shock.'
  },
  {
    id: 'shock-6',
    category: 'Shock',
    prompt: 'A 59-year-old male presents with severe vomiting and diarrhea of 3 days\' duration. He is confused and diaphoretic, radial pulses are absent, and blood pressure is 78/50 mm Hg. After applying supplemental oxygen, you should:',
    options: [
      'perform a head-to-toe exam.',
      'allow him to drink plain water.',
      'obtain a repeat blood pressure in 5 minutes.',
      'prepare for immediate transport.'
    ],
    answer: 3,
    explanation: 'This patient has decompensated shock and needs immediate transport.'
  },
  {
    id: 'shock-7',
    category: 'Shock',
    prompt: 'A 70-year-old female was recently discharged following a total hip replacement. Today she has restlessness, tachycardia, BP 90/64 mm Hg, and hot moist skin. You should be MOST suspicious of:',
    options: [
      'septic shock.',
      'pump failure.',
      'a local infection.',
      'decompensated shock.'
    ],
    answer: 0,
    explanation: 'Recent hospitalization and surgery with warm, moist skin and hypotension are classic for septic shock.'
  },
  {
    id: 'shock-8',
    category: 'Shock',
    prompt: 'A construction worker fell approximately 30 feet. He is semiconscious with rapid, shallow respirations and thoracic spine deformity. His BP is 70/50 mm Hg, pulse 66 and weak, skin warm and dry. In addition to spinal immobilization and rapid transport, the MOST appropriate treatment includes:',
    options: [
      'oxygen via nonrebreathing mask, blankets for warmth, and elevation of his head.',
      'assisted ventilation, thermal management, and elevation of the lower extremities.',
      'oxygen via nonrebreathing mask, thermal management, and elevation of his legs.',
      'assisted ventilation, preventing hyperthermia, and elevating his lower extremities.'
    ],
    answer: 1,
    explanation: 'This presentation suggests neurogenic shock with inadequate breathing, so assist ventilations, keep him warm, and consider leg elevation if not contraindicated by injuries/protocol.'
  },
  {
    id: 'shock-9',
    category: 'Shock',
    prompt: 'All of the following conditions should make you suspect shock, EXCEPT:',
    options: ['anaphylaxis.', 'spinal injury.', 'severe infection.', 'ischemic stroke.'],
    answer: 3,
    explanation: 'An ischemic stroke is not itself a classic shock state.'
  },
  {
    id: 'shock-10',
    category: 'Shock',
    prompt: 'Capillary sphincters are:',
    options: [
      'under complete control of the voluntary portion of the nervous system.',
      'capable of dilating in order to increase perfusion to crucial body organs.',
      'responsible for constricting to compensate for decreased cell perfusion.',
      'circular muscular walls that regulate blood flow through the capillaries.'
    ],
    answer: 3,
    explanation: 'Precapillary sphincters are circular smooth muscle structures that regulate capillary blood flow.'
  },
  {
    id: 'shock-11',
    category: 'Shock',
    prompt: 'Cardiogenic shock may result from all of the following, EXCEPT:',
    options: ['heart attack.', 'increased afterload.', 'increased preload.', 'poor contractility.'],
    answer: 2,
    explanation: 'Increased preload does not best fit as a cause here; MI, poor contractility, and increased afterload can contribute to cardiogenic shock.'
  },
  {
    id: 'shock-12',
    category: 'Shock',
    prompt: 'Clinical signs of compensated shock include all of the following, EXCEPT:',
    options: ['cool and clammy skin.', 'absent peripheral pulses.', 'restlessness or anxiety.', 'rapid, shallow breathing.'],
    answer: 1,
    explanation: 'Absent peripheral pulses are more consistent with decompensated shock.'
  },
  {
    id: 'shock-13',
    category: 'Shock',
    prompt: 'Distributive shock occurs when:',
    options: [
      'an injury causes restriction of the heart muscle and impairs its pumping function.',
      'severe bleeding causes tachycardia in order to distribute blood to the organs faster.',
      'temporary but severe vasodilation causes a decrease in blood supply to the brain.',
      'widespread dilation of the blood vessels causes blood to pool in the vascular beds.'
    ],
    answer: 3,
    explanation: 'Distributive shock is caused by widespread vasodilation and relative hypoperfusion.'
  },
  {
    id: 'shock-14',
    category: 'Shock',
    prompt: 'Hypotension in a child with blunt or penetrating trauma is particularly significant because:',
    options: [
      'it typically develops earlier in children than it does in adults.',
      'the most likely cause of the hypotension is respiratory failure.',
      'it often indicates the loss of half of his or her blood volume.',
      'most children with hypotension die in the prehospital setting.'
    ],
    answer: 2,
    explanation: 'Children compensate very well until late; hypotension is a grave late sign and may indicate major blood loss.'
  },
  {
    id: 'shock-15',
    category: 'Shock',
    prompt: 'Hypovolemic shock caused by severe burns is the result of a loss of:',
    options: ['plasma.', 'platelets.', 'whole blood.', 'red blood cells.'],
    answer: 0,
    explanation: 'Burn shock primarily involves plasma loss from damaged capillaries.'
  },
  {
    id: 'shock-16',
    category: 'Shock',
    prompt: 'In an acute injury setting, neurogenic shock is commonly accompanied by:',
    options: ['hypovolemia.', 'tachycardia.', 'diaphoresis.', 'hypothermia.'],
    answer: 3,
    explanation: 'Loss of sympathetic tone impairs temperature regulation, so hypothermia is common; bradycardia is more likely than tachycardia.'
  },
  {
    id: 'shock-17',
    category: 'Shock',
    prompt: 'In infants and children, a capillary refill time greater than ______ second(s) is a sign of poor peripheral perfusion.',
    options: ['1', '2', '3', '4'],
    answer: 1,
    explanation: 'A capillary refill time greater than 2 seconds is abnormal in children.'
  },
  {
    id: 'shock-18',
    category: 'Shock',
    prompt: 'Neurogenic shock occurs when:',
    options: [
      'failure of the nervous system causes widespread vasodilation.',
      'the spinal cord is severed and causes massive hemorrhaging.',
      'there is too much blood to fill a smaller vascular container.',
      'massive vasoconstriction occurs distal to a spinal cord injury.'
    ],
    answer: 0,
    explanation: 'Neurogenic shock is distributive shock from loss of sympathetic nervous system control.'
  },
  {
    id: 'shock-19',
    category: 'Shock',
    prompt: 'One of the primary waste products of normal cellular metabolism that must be removed by the lungs is:',
    options: ['lactic acid.', 'carbon dioxide.', 'pyruvic acid.', 'carbon monoxide.'],
    answer: 1,
    explanation: 'The lungs remove carbon dioxide generated by cellular metabolism.'
  },
  {
    id: 'shock-20',
    category: 'Shock',
    prompt: 'Patients develop septic shock secondary to:',
    options: [
      'bacterial damage to the vessel wall, leaking blood vessels, and vasodilation.',
      'an infection that weakens cardiac contractions.',
      'failure of the blood vessels to adequately dilate.',
      'weak vessel tone caused by nervous system damage.'
    ],
    answer: 0,
    explanation: 'Septic shock involves infection-related vessel damage, capillary leakage, and vasodilation.'
  },
  {
    id: 'shock-21',
    category: 'Shock',
    prompt: 'Pulmonary edema and impaired ventilation occur during:',
    options: ['septic shock.', 'neurogenic shock.', 'cardiogenic shock.', 'anaphylactic shock.'],
    answer: 2,
    explanation: 'Cardiogenic shock commonly causes pulmonary edema because the failing heart backs fluid into the lungs.'
  },
  {
    id: 'shock-22',
    category: 'Shock',
    prompt: 'Shock is the result of:',
    options: [
      'hypoperfusion to the cells of the body.',
      'the body\'s maintenance of homeostasis.',
      'temporary dysfunction of a major organ.',
      'widespread constriction of the blood vessels.'
    ],
    answer: 0,
    explanation: 'Shock is inadequate tissue perfusion leading to cellular hypoxia.'
  },
  {
    id: 'shock-23',
    category: 'Shock',
    prompt: 'Temporary, widespread vasodilation and syncope caused by a sudden nervous system reaction MOST accurately describes:',
    options: ['vasovagal shock.', 'neurogenic shock.', 'psychogenic shock.', 'neurologic shock.'],
    answer: 2,
    explanation: 'Psychogenic shock is transient fainting from a sudden nervous system reaction causing vasodilation.'
  },
  {
    id: 'shock-24',
    category: 'Shock',
    prompt: 'To protect vital organs, the body compensates by directing blood flow away from organs more tolerant of low flow, such as:',
    options: ['the skin.', 'the heart.', 'the brain.', 'the lungs.'],
    answer: 0,
    explanation: 'During compensation, blood is shunted away from the skin toward core organs.'
  },
  {
    id: 'shock-25',
    category: 'Shock',
    prompt: 'When assessing a patient with signs and symptoms of shock, remember that:',
    options: [
      'the patient\'s respirations are deep during the early stages of shock.',
      'blood pressure may be the last measurable factor to change in shock.',
      'multiple fractures are the most common cause of hypovolemic shock.',
      'irreversible shock often responds well to a prompt blood transfusion.'
    ],
    answer: 1,
    explanation: 'Blood pressure can remain normal until late shock, so it is often a late sign.'
  },
  {
    id: 'shock-26',
    category: 'Shock',
    prompt: 'When treating an 80-year-old patient who is in shock, it is important to remember that:',
    options: [
      'compensation from the respiratory system usually manifests with increased tidal volume.',
      'the older patient\'s central nervous system usually reacts more briskly to compensate for shock.',
      'medications older patients take for hypertension often cause an unusually fast heart rate.',
      'changes in gastric motility may delay gastric emptying, which increases the risk for vomiting.'
    ],
    answer: 3,
    explanation: 'Older patients may have delayed gastric emptying and higher aspiration risk.'
  },
  {
    id: 'shock-27',
    category: 'Shock',
    prompt: 'Which MOST accurately describes septic shock?',
    options: [
      'Bacterial infection of the nervous system with widespread vasodilation',
      'Widespread vasoconstriction and plasma loss due to a severe viral infection',
      'Bacterial damage to the vessel wall, leaking blood vessels, and vasodilation',
      'Viral infection of the blood vessels, vascular damage, and vasoconstriction'
    ],
    answer: 2,
    explanation: 'Septic shock involves infection-related vessel damage, capillary leakage, and vasodilation.'
  },
  {
    id: 'shock-28',
    category: 'Shock',
    prompt: 'Which clinical sign is unique to anaphylactic shock?',
    options: ['Pallor', 'Dizziness', 'Wheezing', 'Hypotension'],
    answer: 2,
    explanation: 'Wheezing from bronchospasm is strongly associated with anaphylaxis.'
  },
  {
    id: 'shock-29',
    category: 'Shock',
    prompt: 'Which injury would MOST likely cause obstructive shock?',
    options: ['Liver laceration', 'Cardiac tamponade', 'Simple pneumothorax', 'Spinal cord injury'],
    answer: 1,
    explanation: 'Cardiac tamponade obstructs cardiac filling and is a classic cause of obstructive shock.'
  },
  {
    id: 'shock-30',
    category: 'Shock',
    prompt: 'Which is the ONLY action that can prevent death from a tension pneumothorax?',
    options: [
      'Early administration of high-flow oxygen',
      'Rapid administration of intravenous fluids',
      'Decompression of the injured side of the chest',
      'Positive-pressure ventilation with a bag-valve mask'
    ],
    answer: 2,
    explanation: 'Tension pneumothorax is fatal unless decompressed.'
  },
  {
    id: 'shock-31',
    category: 'Shock',
    prompt: 'Which patient is in decompensated shock?',
    options: [
      'A 20-year-old female with absent radial pulses and dilated pupils',
      'A 23-year-old restless male with cool, clammy skin and tachycardia',
      'A 28-year-old female with pale skin and rapid, shallow respirations',
      'A 32-year-old male with anxiety and a systolic blood pressure of 110 mm Hg'
    ],
    answer: 0,
    explanation: 'Absent radial pulses indicate severe hypoperfusion and decompensated shock.'
  },
  {
    id: 'shock-32',
    category: 'Shock',
    prompt: 'Which statement regarding anaphylactic shock is correct?',
    options: [
      'Anaphylactic shock occurs immediately after a person is sensitized to an allergen.',
      'Sensitized people will experience less severe reactions upon subsequent exposure.',
      'Anaphylactic shock is caused by immune system failure due to a toxic exposure.',
      'Subsequent exposure after sensitization often produces a more severe reaction.'
    ],
    answer: 3,
    explanation: 'Once sensitized, later exposures may trigger more severe anaphylaxis.'
  },
  {
    id: 'shock-33',
    category: 'Shock',
    prompt: 'Which would MOST likely result in hemorrhagic shock?',
    options: ['Severe vomiting', 'Liver laceration', 'Excessive sweating', 'Repeated diarrhea'],
    answer: 1,
    explanation: 'A liver laceration can cause major internal bleeding and hemorrhagic shock.'
  },
  {
    id: 'shock-34',
    category: 'Shock',
    prompt: 'A 40-year-old female fainted after learning her sister was killed in a crash. She is now alert and says she is fine. She refuses oxygen. Your primary concern should be to:',
    options: [
      'determine if she was injured when she fainted.',
      'provide emotional support regarding her sister.',
      'advise her that she needs to go to the hospital.',
      'obtain baseline vital signs and a medical history.'
    ],
    answer: 0,
    explanation: 'After syncope, first make sure she was not injured during the fall.'
  },
  {
    id: 'shock-35',
    category: 'Shock',
    prompt: 'You are transporting a 33-year-old male involved in a major crash. Immediate threats are addressed and condition stabilized. ETA is 20 minutes. You should:',
    options: [
      'take his vital signs in 15 minutes.',
      'arrange for an ALS rendezvous.',
      'reassess his condition in 5 minutes.',
      'repeat your secondary assessment.'
    ],
    answer: 2,
    explanation: 'Unstable patients should be reassessed every 5 minutes.'
  },
  {
    id: 'shock-36',
    category: 'Shock',
    prompt: 'A 44-year-old male has a partial amputation of the right lower leg from a chainsaw, with active bleeding. He is conscious, breathing adequately, restless, and diaphoretic. You should:',
    options: [
      'immediately evaluate his airway.',
      'apply direct pressure to the wound.',
      'assess the rate and quality of his pulse.',
      'administer 100% supplemental oxygen.'
    ],
    answer: 1,
    explanation: 'Massive external bleeding is an immediate life threat and should be controlled at once.'
  },
  {
    id: 'shock-37',
    category: 'Shock',
    prompt: 'Your assessment of an unresponsive patient reveals that her breathing is inadequate. Your MOST immediate action should be to:',
    options: [
      'administer high-flow oxygen.',
      'check her airway for obstructions.',
      'move her to the ambulance stretcher.',
      'ventilate her with a bag-mask device.'
    ],
    answer: 3,
    explanation: 'Inadequate breathing requires immediate assisted ventilation.'
  },
  {
    id: 'bls-1',
    category: 'BLS/CPR',
    prompt: 'Basic life support (BLS) is defined as:',
    options: [
      'any form of emergency medical treatment performed by advanced EMTs, paramedics, physicians, and emergency nurses.',
      'invasive emergency medical interventions such as intravenous therapy, manual defibrillation, and advanced airway management.',
      'basic lifesaving treatment performed by bystanders while EMS providers are en route to the scene.',
      'noninvasive emergency care used to treat conditions such as airway obstruction, respiratory arrest, and cardiac arrest.'
    ],
    answer: 3,
    explanation: 'BLS consists of noninvasive emergency care for life-threatening airway, breathing, and circulation problems.'
  },
  {
    id: 'bls-2',
    category: 'BLS/CPR',
    prompt: 'After ________ minutes without oxygen, permanent brain damage is possible.',
    options: ['2 to 3', '1 to 2', '7', '4 to 6'],
    answer: 3,
    explanation: 'Permanent brain damage may begin after about 4 to 6 minutes without oxygen.'
  },
  {
    id: 'bls-3',
    category: 'BLS/CPR',
    prompt: 'After establishing that an adult patient is unresponsive, you should:',
    options: [
      'manually open the airway.',
      'assess for breathing and a pulse.',
      'apply the AED and deliver a shock, if needed.',
      'immediately begin chest compressions.'
    ],
    answer: 1,
    explanation: 'Once unresponsiveness is confirmed, check breathing and pulse quickly.'
  },
  {
    id: 'bls-4',
    category: 'BLS/CPR',
    prompt: 'Which is NOT a BLS intervention?',
    options: ['Automated defibrillation', 'Chest compressions', 'Cardiac monitoring', 'Abdominal thrusts'],
    answer: 2,
    explanation: 'Cardiac monitoring is beyond standard BLS.'
  },
  {
    id: 'bls-5',
    category: 'BLS/CPR',
    prompt: 'Which statement regarding ventricular fibrillation (VF) is correct?',
    options: [
      'VF is a state of rapid ventricular contraction.',
      'VF results in an absence of forward blood flow.',
      'Most patients in VF have a weak carotid pulse.',
      'Defibrillation is only indicated for witnessed VF.'
    ],
    answer: 1,
    explanation: 'VF is chaotic ventricular activity with no effective cardiac output.'
  },
  {
    id: 'bls-6',
    category: 'BLS/CPR',
    prompt: 'You and your partner arrive at a 60-year-old woman who collapsed about 7 minutes ago. She is unresponsive, apneic, and pulseless. You should:',
    options: [
      'apply the AED if there is no response after 10 cycles of CPR.',
      'begin CPR and apply the AED as soon as it is available.',
      'immediately apply the AED and analyze her cardiac rhythm.',
      'begin CPR at a compression to ventilation ratio of 15:2.'
    ],
    answer: 1,
    explanation: 'Start CPR immediately and use the AED as soon as possible.'
  },
  {
    id: 'bls-7',
    category: 'BLS/CPR',
    prompt: 'During CPR, an AED pad placement area is covered by a medication patch. You should:',
    options: [
      'apply the AED pad at least 1 inch away from the patch.',
      'move the patch to another area of the chest.',
      'continue CPR until you determine the medication name.',
      'remove the patch, wipe away any residue, and apply the AED pad.'
    ],
    answer: 3,
    explanation: 'Medication patches must be removed and residue wiped away before pad placement.'
  },
  {
    id: 'bls-8',
    category: 'BLS/CPR',
    prompt: 'Which maneuver should be used to open the airway when spinal injury is suspected?',
    options: ['Head tilt-neck lift', 'Jaw-thrust', 'Head tilt-chin lift', 'Tongue-jaw lift'],
    answer: 1,
    explanation: 'Use the jaw-thrust maneuver when spinal injury is suspected.'
  },
  {
    id: 'bls-9',
    category: 'BLS/CPR',
    prompt: 'Several attempts to open a trauma patient\'s airway with jaw-thrust have failed. You should:',
    options: [
      'carefully perform the head tilt-chin lift maneuver.',
      'tilt the head back while lifting on the neck.',
      'suction the airway and reattempt jaw-thrust.',
      'try opening the airway by lifting up on the chin.'
    ],
    answer: 0,
    explanation: 'If jaw-thrust fails, carefully use head tilt-chin lift to open the airway.'
  },
  {
    id: 'bls-10',
    category: 'BLS/CPR',
    prompt: 'A patient should be placed in the recovery position when he or she:',
    options: [
      'has experienced trauma but is breathing effectively.',
      'is semiconscious, injured, and breathing adequately.',
      'has a pulse but is unresponsive and breathing shallowly.',
      'is unresponsive, uninjured, and breathing adequately.'
    ],
    answer: 3,
    explanation: 'Recovery position is for an unresponsive, nontrauma patient with adequate breathing.'
  },
  {
    id: 'bls-11',
    category: 'BLS/CPR',
    prompt: 'When performing chest compressions on an adult, the EMT should compress:',
    options: ['at least 2 inches', 'at least 1 inch', 'between 1 inch and 2 inches', 'greater than 2.4 inches'],
    answer: 0,
    explanation: 'Adult chest compressions should be at least 2 inches deep.'
  },
  {
    id: 'bls-12',
    category: 'BLS/CPR',
    prompt: 'When ventilating an apneic adult with a bag-mask device, you should deliver each breath:',
    options: [
      'every 2 to 3 seconds (20 to 30 breaths/min).',
      'over a period of about 2 to 3 seconds.',
      'quickly to ensure adequate ventilation.',
      'while watching for adequate chest rise.'
    ],
    answer: 3,
    explanation: 'Give each breath only until visible chest rise occurs.'
  },
  {
    id: 'bls-13',
    category: 'BLS/CPR',
    prompt: 'CPR will NOT be effective if the patient is:',
    options: ['horizontal.', 'prone.', 'supine.', 'on a firm surface.'],
    answer: 1,
    explanation: 'Standard chest compressions are not effective with the patient lying prone.'
  },
  {
    id: 'bls-14',
    category: 'BLS/CPR',
    prompt: 'A 60-year-old man is found unresponsive, pulseless, and apneic. You should:',
    options: [
      'determine if he has a valid living will.',
      'start CPR and transport immediately.',
      'withhold CPR until he is defibrillated.',
      'begin CPR until an AED is available.'
    ],
    answer: 3,
    explanation: 'Begin CPR immediately while the AED is being obtained.'
  },
  {
    id: 'bls-15',
    category: 'BLS/CPR',
    prompt: 'For one-rescuer adult CPR, you should compress the chest at a rate of:',
    options: [
      '100 to 120 compressions per minute.',
      '80 to 100 compressions per minute.',
      'at least 120 compressions per minute.',
      'no greater than 100 compressions per minute.'
    ],
    answer: 0,
    explanation: 'The correct compression rate is 100 to 120 per minute.'
  },
  {
    id: 'bls-16',
    category: 'BLS/CPR',
    prompt: 'In two-rescuer adult CPR, the compression-to-ventilation ratio is:',
    options: ['30:2.', '5:2.', '15:2.', '5:1.'],
    answer: 0,
    explanation: 'Adult CPR uses 30:2 whether one or two rescuers are present, unless an advanced airway is in place.'
  },
  {
    id: 'bls-17',
    category: 'BLS/CPR',
    prompt: 'After an advanced airway has been inserted during two-rescuer CPR, you should:',
    options: [
      'pause compressions to deliver ventilations.',
      'increase rescue breathing to a rate of 14 breaths/min.',
      'decrease the compression rate to about 80 per minute.',
      'deliver one rescue breath every 6 seconds.'
    ],
    answer: 3,
    explanation: 'With an advanced airway, give continuous compressions and 1 breath every 6 seconds.'
  },
  {
    id: 'bls-18',
    category: 'BLS/CPR',
    prompt: 'In most cases, cardiopulmonary arrest in infants and children is caused by:',
    options: ['severe chest trauma.', 'a drug overdose.', 'a cardiac dysrhythmia.', 'respiratory arrest.'],
    answer: 3,
    explanation: 'Pediatric cardiac arrest most often follows respiratory failure.'
  },
  {
    id: 'bls-19',
    category: 'BLS/CPR',
    prompt: 'The proper depth of chest compressions on a 9-month-old infant is:',
    options: [
      'one half the diameter of the chest, or about 1½ inches.',
      'two thirds the diameter of the chest, or about 2 inches.',
      'one third the diameter of the chest, or about 1½ inches.',
      'one half to two thirds the diameter of the chest.'
    ],
    answer: 2,
    explanation: 'Infant compressions should be about one third the chest depth, roughly 1.5 inches.'
  },
  {
    id: 'bls-20',
    category: 'BLS/CPR',
    prompt: 'What is the minimum number of chest compressions that should be delivered per minute to a 4-month-old infant?',
    options: ['100', '90', '120', '110'],
    answer: 0,
    explanation: 'The minimum compression rate is 100 per minute.'
  },
  {
    id: 'bls-21',
    category: 'BLS/CPR',
    prompt: 'When assessing the pulse of an unresponsive infant, you should palpate the ________ artery.',
    options: ['carotid', 'brachial', 'femoral', 'radial'],
    answer: 1,
    explanation: 'Use the brachial artery to assess an infant pulse.'
  },
  {
    id: 'bls-22',
    category: 'BLS/CPR',
    prompt: 'What is the correct ratio of compressions to ventilations when performing two-rescuer child CPR?',
    options: ['15:2', '5:1', '3:1', '30:2'],
    answer: 0,
    explanation: 'Two-rescuer child CPR uses a 15:2 ratio.'
  },
  {
    id: 'bls-23',
    category: 'BLS/CPR',
    prompt: 'When performing CPR on a child, you should compress the chest:',
    options: [
      'until a radial pulse is felt.',
      '80 to 100 times per minute.',
      'to a depth of 1 to 2 inches.',
      'with one or two hands.'
    ],
    answer: 3,
    explanation: 'For a child, compress with one or two hands depending on the child\'s size and rescuer strength.'
  },
  {
    id: 'bls-24',
    category: 'BLS/CPR',
    prompt: 'Which is considered an obvious sign of death and would not require CPR?',
    options: ['Dependent blood pooling', 'Agonal respiratory effort', 'Pulselessness and apnea', 'Severe cyanosis to the face'],
    answer: 0,
    explanation: 'Dependent lividity is an obvious sign of death.'
  },
  {
    id: 'bls-25',
    category: 'BLS/CPR',
    prompt: 'CPR should be initiated when:',
    options: [
      'rigor mortis is obvious.',
      'signs of putrefaction are present.',
      'a valid living will is unavailable.',
      'the carotid pulse is absent.'
    ],
    answer: 3,
    explanation: 'CPR is indicated when the patient is pulseless and apneic; absence of a carotid pulse confirms this.'
  },
  {
    id: 'bls-26',
    category: 'BLS/CPR',
    prompt: 'Abdominal thrusts in a conscious child or adult with severe upper airway obstruction are performed:',
    options: [
      'in sets of five followed by reassessment.',
      'until he or she loses consciousness.',
      'about 1 inch below the xiphoid process.',
      'until he or she experiences cardiac arrest.'
    ],
    answer: 1,
    explanation: 'Continue abdominal thrusts until the object is expelled or the patient becomes unconscious.'
  },
  {
    id: 'bls-27',
    category: 'BLS/CPR',
    prompt: 'Initial treatment to dislodge a severe foreign body airway obstruction in a responsive infant involves:',
    options: ['blind finger sweeps.', 'back slaps.', 'abdominal thrusts.', 'bag-mask ventilation.'],
    answer: 1,
    explanation: 'Start with back slaps in a responsive choking infant.'
  },
  {
    id: 'bls-28',
    category: 'BLS/CPR',
    prompt: 'CPR is in progress on a pregnant woman. Shortly after manually displacing her uterus to the left, return of spontaneous circulation occurs. What MOST likely explains this?',
    options: [
      'Increased blood flow to her heart caused her ventricles to stop fibrillating, restoring her pulse.',
      'Displacement of her uterus allowed her lungs to expand more fully, restoring her pulse.',
      'Displacement of her uterus caused blood to flow backward, increasing blood flow to her heart.',
      'Pressure was relieved from her aorta and vena cava, which improved chest compression effectiveness.'
    ],
    answer: 3,
    explanation: 'Left uterine displacement relieves aortocaval compression, improving venous return and CPR effectiveness.'
  },
  {
    id: 'bls-29',
    category: 'BLS/CPR',
    prompt: 'CPR retraining is MOST effective when it:',
    options: [
      'is delivered by computer.',
      'involves hands-on practice.',
      'occurs every 24 months.',
      'is self-paced and brief.'
    ],
    answer: 1,
    explanation: 'Hands-on practice is the best way to maintain CPR skills.'
  },
  {
    id: 'bls-30',
    category: 'BLS/CPR',
    prompt: 'You are off duty at a park when an apparently healthy 12-year-old child suddenly collapses. There are no bystanders, and your phone is in your car. After confirming cardiac arrest, you should:',
    options: [
      'perform CPR for 2 minutes and then call 9-1-1.',
      'perform chest compressions only until a bystander arrives.',
      'deliver five rescue breaths before starting chest compressions.',
      'call 9-1-1 and then return to begin CPR on the child.'
    ],
    answer: 3,
    explanation: 'According to your original quiz, you should activate EMS (call 9-1-1) first, then return and begin CPR.'
  }
];


const STORAGE_KEY = 'emt-quiz-history-v1';

function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function buildQuiz(source, count) {
  const shuffled = shuffleArray(source);
  return shuffled.slice(0, Math.min(count, shuffled.length)).map((q) => {
    const decorated = q.options.map((text, originalIndex) => ({ text, originalIndex }));
    const shuffledOptions = shuffleArray(decorated);
    return {
      ...q,
      shuffledOptions,
      correctDisplayedIndex: shuffledOptions.findIndex((o) => o.originalIndex === q.answer),
    };
  });
}

function loadHistory() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveHistory(history) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch {}
}

function Card({ children, className = '' }) {
  return <div className={`card ${className}`}>{children}</div>;
}

function Button({ children, className = '', variant = 'primary', ...props }) {
  return <button className={`btn btn-${variant} ${className}`} {...props}>{children}</button>;
}

function Badge({ children }) {
  return <span className="badge">{children}</span>;
}

export default function App() {
  const [mode, setMode] = useState('all');
  const [count, setCount] = useState(20);
  const [quizSeed, setQuizSeed] = useState(0);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [missedIds, setMissedIds] = useState([]);
  const [reviewMode, setReviewMode] = useState(false);
  const [showExplanation, setShowExplanation] = useState(true);
  const [timed, setTimed] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [history, setHistory] = useState([]);
  const [recordedThisRun, setRecordedThisRun] = useState(false);

  useEffect(() => {
    setHistory(loadHistory());
  }, []);

  useEffect(() => {
    if (!timed || finished) return;
    if (timeLeft <= 0) {
      setFinished(true);
      return;
    }
    const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [timed, finished, timeLeft]);

  const sourceQuestions = useMemo(() => {
    let base = questionBank;
    if (mode !== 'all') base = base.filter((q) => q.category === mode);
    if (reviewMode) base = base.filter((q) => missedIds.includes(q.id));
    return base;
  }, [mode, reviewMode, missedIds]);

  const quiz = useMemo(() => buildQuiz(sourceQuestions, count), [sourceQuestions, count, quizSeed]);
  const question = quiz[current];

  const historyStats = useMemo(() => {
    const attempts = history.length;
    const avgAccuracy = attempts ? Math.round(history.reduce((sum, item) => sum + item.accuracy, 0) / attempts) : 0;
    const bestAccuracy = attempts ? Math.max(...history.map((item) => item.accuracy)) : 0;
    const latestAccuracy = attempts ? history[history.length - 1].accuracy : 0;
    return { attempts, avgAccuracy, bestAccuracy, latestAccuracy };
  }, [history]);

  const chartData = useMemo(() => history.map((item, index) => ({
    name: `#${index + 1}`,
    accuracy: item.accuracy,
  })), [history]);

  const resetQuizState = (newSeed = true) => {
    if (newSeed) setQuizSeed((s) => s + 1);
    setCurrent(0);
    setSelected(null);
    setSubmitted(false);
    setScore(0);
    setFinished(false);
    setRecordedThisRun(false);
    setTimeLeft(timed ? count * 20 : 0);
  };

  const toggleTimed = () => {
    const nextTimed = !timed;
    setTimed(nextTimed);
    setTimeLeft(nextTimed ? count * 20 : 0);
    setCurrent(0);
    setSelected(null);
    setSubmitted(false);
    setScore(0);
    setFinished(false);
    setRecordedThisRun(false);
    setQuizSeed((s) => s + 1);
  };

  const recordSession = (finalScore, totalQuestions) => {
    if (recordedThisRun || !totalQuestions) return;
    const accuracy = Math.round((finalScore / totalQuestions) * 100);
    const entry = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      score: finalScore,
      total: totalQuestions,
      accuracy,
      mode: reviewMode ? 'Missed Only' : mode,
      timed,
      date: new Date().toLocaleString(),
    };
    const nextHistory = [...history, entry].slice(-25);
    setHistory(nextHistory);
    saveHistory(nextHistory);
    setRecordedThisRun(true);
  };

  useEffect(() => {
    if (finished && quiz.length > 0) recordSession(score, quiz.length);
  }, [finished]);

  const submitAnswer = () => {
    if (selected === null || submitted || !question) return;
    const correct = selected === question.correctDisplayedIndex;
    setSubmitted(true);
    if (correct) setScore((s) => s + 1);
    else if (!missedIds.includes(question.id)) setMissedIds((prev) => [...prev, question.id]);
  };

  const nextQuestion = () => {
    if (current + 1 >= quiz.length) {
      setFinished(true);
      return;
    }
    setCurrent((c) => c + 1);
    setSelected(null);
    setSubmitted(false);
  };

  const clearHistory = () => {
    setHistory([]);
    saveHistory([]);
  };

  const accuracyNow = quiz.length ? Math.round((score / quiz.length) * 100) : 0;

  if (!question && !finished) {
    return (
      <div className="app-shell">
        <div className="container">
          <Card>
            <h1>EMT Practice Quiz</h1>
            <p>No questions available for the current mode yet.</p>
            <Button onClick={() => { setReviewMode(false); setMode('all'); resetQuizState(true); }}>Go Back to All Questions</Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <div className="container">
        <div className="hero">
          <div>
            <h1>EMT Practice Quiz</h1>
            <p>Repeatable study mode with score history, missed-question review, and timed practice.</p>
          </div>
          <div className="actions">
            <Button variant="secondary" onClick={() => resetQuizState(true)}>New Random Quiz</Button>
            <Button variant="ghost" onClick={() => resetQuizState(false)}>Restart</Button>
          </div>
        </div>

        <div className="grid grid-5">
          <Card>
            <label>Quiz mode</label>
            <select value={mode} onChange={(e) => { setMode(e.target.value); setReviewMode(false); resetQuizState(true); }}>
              <option value="all">All topics</option>
              <option value="Shock">Shock only</option>
              <option value="BLS/CPR">BLS / CPR only</option>
            </select>
          </Card>
          <Card>
            <label>Question count</label>
            <select value={count} onChange={(e) => { setCount(Number(e.target.value)); resetQuizState(true); }}>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
              <option value={50}>50</option>
              <option value={67}>All available</option>
            </select>
          </Card>
          <Card className="center-card">
            <Button onClick={() => setShowExplanation((v) => !v)}>{showExplanation ? 'Explanations On' : 'Explanations Off'}</Button>
          </Card>
          <Card className="center-card">
            <Button variant={reviewMode ? 'primary' : 'secondary'} onClick={() => { setReviewMode((v) => !v); resetQuizState(true); }}>
              {reviewMode ? 'Exit Missed Only' : 'Missed Only'}
            </Button>
          </Card>
          <Card className="center-card">
            <Button variant={timed ? 'primary' : 'ghost'} onClick={toggleTimed}>Timed {timed ? 'On' : 'Off'}</Button>
          </Card>
        </div>

        <div className="grid grid-4">
          <Card><div className="stat-label">Attempts</div><div className="stat-value">{historyStats.attempts}</div></Card>
          <Card><div className="stat-label">Average Accuracy</div><div className="stat-value">{historyStats.avgAccuracy}%</div></Card>
          <Card><div className="stat-label">Best Accuracy</div><div className="stat-value">{historyStats.bestAccuracy}%</div></Card>
          <Card><div className="stat-label">Latest Accuracy</div><div className="stat-value">{historyStats.latestAccuracy}%</div></Card>
        </div>

        <Card>
          <div className="chart-header">
            <h2>Accuracy Over Time</h2>
            <Button variant="ghost" onClick={clearHistory}>Clear History</Button>
          </div>
          {chartData.length > 0 ? (
            <div className="chart-wrap">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#555" />
                  <XAxis dataKey="name" stroke="#fff" />
                  <YAxis domain={[0, 100]} stroke="#fff" />
                  <Tooltip />
                  <Line type="monotone" dataKey="accuracy" stroke="#ffffff" strokeWidth={3} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p>Finish a quiz to start tracking your accuracy over time.</p>
          )}
        </Card>

        {timed && !finished && <div className="timer">Time: {timeLeft}s</div>}

        <Card>
          <div className="quiz-header">
            <h2>{finished ? 'Quiz Complete' : `Question ${current + 1} of ${quiz.length}`}</h2>
            <div className="badges">
              <Badge>{reviewMode ? 'Missed Only' : mode}</Badge>
              <Badge>Score: {score}</Badge>
            </div>
          </div>
          <div className="progress-bar"><div className="progress-fill" style={{ width: `${finished ? 100 : ((current + 1) / quiz.length) * 100}%` }}></div></div>

          {!finished ? (
            <div className="quiz-body">
              <div className="prompt">{question.prompt}</div>
              <div className="answers">
                {question.shuffledOptions.map((option, idx) => {
                  const isSelected = selected === idx;
                  const isCorrect = submitted && idx === question.correctDisplayedIndex;
                  const isWrongSelected = submitted && isSelected && idx !== question.correctDisplayedIndex;

                  let extra = '';
                  if (isCorrect) extra = ' answer-correct';
                  else if (isWrongSelected) extra = ' answer-wrong';
                  else if (isSelected) extra = ' answer-selected';

                  return (
                    <button key={idx} className={`answer-btn${extra}`} onClick={() => !submitted && setSelected(idx)}>
                      <span className="letter">{String.fromCharCode(65 + idx)}.</span>
                      <span>{option.text}</span>
                    </button>
                  );
                })}
              </div>

              {submitted && showExplanation && (
                <div className="explanation-box">
                  <div className="explanation-title">{selected === question.correctDisplayedIndex ? 'Correct' : 'Incorrect'}</div>
                  <p>{question.explanation}</p>
                  {selected !== question.correctDisplayedIndex && (
                    <p><strong>Correct answer:</strong> {question.shuffledOptions[question.correctDisplayedIndex].text}</p>
                  )}
                </div>
              )}

              <div className="actions">
                {!submitted ? (
                  <Button onClick={submitAnswer} disabled={selected === null}>Submit Answer</Button>
                ) : (
                  <Button onClick={nextQuestion}>{current + 1 >= quiz.length ? 'Finish' : 'Next Question'}</Button>
                )}
              </div>
            </div>
          ) : (
            <div className="results">
              <div className="final-score">{score} / {quiz.length}</div>
              <div className="final-sub">{accuracyNow}% correct</div>
              <div className="actions">
                <Button onClick={() => resetQuizState(true)}>Take Another Random Quiz</Button>
                <Button variant="secondary" onClick={() => resetQuizState(false)}>Retry Current Settings</Button>
              </div>
            </div>
          )}
        </Card>

        {history.length > 0 && (
          <Card>
            <h2>Recent Sessions</h2>
            <div className="sessions">
              {[...history].reverse().slice(0, 8).map((item) => (
                <div key={item.id} className="session-row">
                  <div>
                    <div className="session-main">{item.accuracy}% accuracy</div>
                    <div className="session-sub">{item.score}/{item.total} correct • {item.mode} • {item.timed ? 'Timed' : 'Untimed'}</div>
                  </div>
                  <div className="session-date">{item.date}</div>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
