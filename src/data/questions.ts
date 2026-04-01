import { Question } from "../lib/types";

export const PREDEFINED_QUESTIONS: Question[] = [
  // Difficulty 1
  { id: "q1-1", text: "Who was the first President of the United States?", options: ["Thomas Jefferson", "Benjamin Franklin", "George Washington", "John Adams"], correctAnswer: "George Washington", category: "History", difficulty: 1 },
  { id: "q1-2", text: "Which city is the capital of the United States?", options: ["New York City", "Washington, D.C.", "Philadelphia", "Boston"], correctAnswer: "Washington, D.C.", category: "Geography", difficulty: 1 },
  { id: "q1-3", text: "How many stars are on the current United States flag?", options: ["13", "48", "50", "52"], correctAnswer: "50", category: "Culture", difficulty: 1 },
  { id: "q1-4", text: "What is the largest state in the US by land area?", options: ["Texas", "California", "Alaska", "Montana"], correctAnswer: "Alaska", category: "Geography", difficulty: 1 },
  { id: "q1-5", text: "Which ocean is on the East Coast of the United States?", options: ["Pacific Ocean", "Indian Ocean", "Atlantic Ocean", "Arctic Ocean"], correctAnswer: "Atlantic Ocean", category: "Geography", difficulty: 1 },
  { id: "q1-6", text: "What is the currency of the United States?", options: ["Euro", "Pound", "Dollar", "Peso"], correctAnswer: "Dollar", category: "Economy", difficulty: 1 },
  { id: "q1-7", text: "In which state is the Grand Canyon located?", options: ["Nevada", "Arizona", "New Mexico", "Utah"], correctAnswer: "Arizona", category: "Geography", difficulty: 1 },
  { id: "q1-8", text: "Which city is known as 'The Big Apple'?", options: ["Los Angeles", "Chicago", "Miami", "New York City"], correctAnswer: "New York City", category: "Culture", difficulty: 1 },
  { id: "q1-9", text: "How many stripes are on the United States flag?", options: ["10", "13", "15", "50"], correctAnswer: "13", category: "Culture", difficulty: 1 },
  { id: "q1-10", text: "How many states make up the United States?", options: ["48", "49", "50", "51"], correctAnswer: "50", category: "Geography", difficulty: 1 },

  // Difficulty 2
  { id: "q2-1", text: "In what year was the Declaration of Independence signed?", options: ["1770", "1776", "1783", "1791"], correctAnswer: "1776", category: "History", difficulty: 2 },
  { id: "q2-2", text: "Who is known as the 'Father of the Constitution'?", options: ["Alexander Hamilton", "James Madison", "Thomas Jefferson", "George Washington"], correctAnswer: "James Madison", category: "History", difficulty: 2 },
  { id: "q2-3", text: "What are the three branches of the US government?", options: ["State, Local, Federal", "Executive, Legislative, Judicial", "House, Senate, President", "Military, Civil, Legal"], correctAnswer: "Executive, Legislative, Judicial", category: "Government", difficulty: 2 },
  { id: "q2-4", text: "Which US state is known as the 'Sunshine State'?", options: ["California", "Arizona", "Florida", "Hawaii"], correctAnswer: "Florida", category: "Geography", difficulty: 2 },
  { id: "q2-5", text: "What is the national bird of the United States?", options: ["Golden Eagle", "Wild Turkey", "Bald Eagle", "Peregrine Falcon"], correctAnswer: "Bald Eagle", category: "Culture", difficulty: 2 },
  { id: "q2-6", text: "In which city is the Statue of Liberty located?", options: ["Philadelphia", "Boston", "New York City", "Washington, D.C."], correctAnswer: "New York City", category: "Geography", difficulty: 2 },
  { id: "q2-7", text: "Where is the Golden Gate Bridge located?", options: ["Los Angeles", "San Francisco", "Seattle", "Portland"], correctAnswer: "San Francisco", category: "Geography", difficulty: 2 },
  { id: "q2-8", text: "How many Senators are in the US Senate?", options: ["50", "100", "435", "538"], correctAnswer: "100", category: "Government", difficulty: 2 },
  { id: "q2-9", text: "What is the name of the President's official residence?", options: ["The Capitol", "The Pentagon", "The White House", "The Lincoln Memorial"], correctAnswer: "The White House", category: "Government", difficulty: 2 },
  { id: "q2-10", text: "What does the Fourth of July celebrate?", options: ["The end of the Civil War", "Independence from Britain", "The signing of the Constitution", "The first Thanksgiving"], correctAnswer: "Independence from Britain", category: "History", difficulty: 2 },

  // Difficulty 3
  { id: "q3-1", text: "Which document starts with the words 'We the People'?", options: ["The Declaration of Independence", "The Bill of Rights", "The Constitution", "The Articles of Confederation"], correctAnswer: "The Constitution", category: "Government", difficulty: 3 },
  { id: "q3-2", text: "Who wrote the 'Star-Spangled Banner'?", options: ["Francis Scott Key", "John Philip Sousa", "Irving Berlin", "Samuel Smith"], correctAnswer: "Francis Scott Key", category: "Culture", difficulty: 3 },
  { id: "q3-3", text: "Which US President was responsible for the Louisiana Purchase?", options: ["George Washington", "John Adams", "Thomas Jefferson", "James Madison"], correctAnswer: "Thomas Jefferson", category: "History", difficulty: 3 },
  { id: "q3-4", text: "What is the longest river in the United States?", options: ["Mississippi River", "Missouri River", "Colorado River", "Rio Grande"], correctAnswer: "Missouri River", category: "Geography", difficulty: 3 },
  { id: "q3-5", text: "How many amendments are in the Bill of Rights?", options: ["5", "10", "12", "15"], correctAnswer: "10", category: "Government", difficulty: 3 },
  { id: "q3-6", text: "In which city is the Liberty Bell located?", options: ["New York City", "Washington, D.C.", "Philadelphia", "Boston"], correctAnswer: "Philadelphia", category: "History", difficulty: 3 },
  { id: "q3-7", text: "In which state is Mount Rushmore located?", options: ["Montana", "Wyoming", "North Dakota", "South Dakota"], correctAnswer: "South Dakota", category: "Geography", difficulty: 3 },
  { id: "q3-8", text: "In what year did the American Civil War begin?", options: ["1776", "1812", "1861", "1865"], correctAnswer: "1861", category: "History", difficulty: 3 },
  { id: "q3-9", text: "What are the first ten amendments to the Constitution called?", options: ["The Preamble", "The Bill of Rights", "The Articles", "The Amendments"], correctAnswer: "The Bill of Rights", category: "Government", difficulty: 3 },
  { id: "q3-10", text: "How many Great Lakes are there in the United States?", options: ["3", "4", "5", "6"], correctAnswer: "5", category: "Geography", difficulty: 3 },

  // Difficulty 4
  { id: "q4-1", text: "Which state was the first to ratify the US Constitution?", options: ["Pennsylvania", "New Jersey", "Delaware", "Georgia"], correctAnswer: "Delaware", category: "History", difficulty: 4 },
  { id: "q4-2", text: "Who was the primary author of the Declaration of Independence?", options: ["Benjamin Franklin", "Thomas Jefferson", "John Adams", "Roger Sherman"], correctAnswer: "Thomas Jefferson", category: "History", difficulty: 4 },
  { id: "q4-3", text: "What is the highest mountain in the United States?", options: ["Mount Whitney", "Mount Rainier", "Mount Denali", "Mount Elbert"], correctAnswer: "Mount Denali", category: "Geography", difficulty: 4 },
  { id: "q4-4", text: "Which amendment to the Constitution gave women the right to vote?", options: ["15th Amendment", "18th Amendment", "19th Amendment", "21st Amendment"], correctAnswer: "19th Amendment", category: "Government", difficulty: 4 },
  { id: "q4-5", text: "In which city was the Constitutional Convention held?", options: ["New York City", "Philadelphia", "Washington, D.C.", "Richmond"], correctAnswer: "Philadelphia", category: "History", difficulty: 4 },
  { id: "q4-6", text: "Who issued the Emancipation Proclamation?", options: ["George Washington", "Thomas Jefferson", "Abraham Lincoln", "Ulysses S. Grant"], correctAnswer: "Abraham Lincoln", category: "History", difficulty: 4 },
  { id: "q4-7", text: "Which President was in office during the 'Trail of Tears'?", options: ["John Quincy Adams", "Andrew Jackson", "Martin Van Buren", "William Henry Harrison"], correctAnswer: "Andrew Jackson", category: "History", difficulty: 4 },
  { id: "q4-8", text: "What was the main purpose of the Lewis and Clark expedition?", options: ["To find gold", "To fight Native Americans", "To explore the Louisiana Territory", "To build a railroad"], correctAnswer: "To explore the Louisiana Territory", category: "History", difficulty: 4 },
  { id: "q4-9", text: "During which war was 'The Star-Spangled Banner' written?", options: ["Revolutionary War", "War of 1812", "Civil War", "Mexican-American War"], correctAnswer: "War of 1812", category: "History", difficulty: 4 },
  { id: "q4-10", text: "What was the main reason for the Boston Tea Party?", options: ["High tea prices", "Lack of tea", "Taxation without representation", "Religious freedom"], correctAnswer: "Taxation without representation", category: "History", difficulty: 4 },

  // Difficulty 5
  { id: "q5-1", text: "Who was the only US President to serve more than two terms?", options: ["Theodore Roosevelt", "Franklin D. Roosevelt", "Woodrow Wilson", "Dwight D. Eisenhower"], correctAnswer: "Franklin D. Roosevelt", category: "History", difficulty: 5 },
  { id: "q5-2", text: "Which state has the most electoral votes?", options: ["Texas", "Florida", "New York", "California"], correctAnswer: "California", category: "Government", difficulty: 5 },
  { id: "q5-3", text: "What was the first national park in the United States?", options: ["Yosemite", "Yellowstone", "Grand Canyon", "Zion"], correctAnswer: "Yellowstone", category: "Geography", difficulty: 5 },
  { id: "q5-4", text: "Who was the first woman to serve on the US Supreme Court?", options: ["Ruth Bader Ginsburg", "Sandra Day O'Connor", "Sonia Sotomayor", "Elena Kagan"], correctAnswer: "Sandra Day O'Connor", category: "Government", difficulty: 5 },
  { id: "q5-5", text: "Which war was fought between the North and the South from 1861 to 1865?", options: ["Revolutionary War", "War of 1812", "Civil War", "Mexican-American War"], correctAnswer: "Civil War", category: "History", difficulty: 5 },
  { id: "q5-6", text: "Who delivered the Gettysburg Address?", options: ["George Washington", "Abraham Lincoln", "Robert E. Lee", "Ulysses S. Grant"], correctAnswer: "Abraham Lincoln", category: "History", difficulty: 5 },
  { id: "q5-7", text: "In what year was the first Transcontinental Railroad completed?", options: ["1849", "1865", "1869", "1883"], correctAnswer: "1869", category: "History", difficulty: 5 },
  { id: "q5-8", text: "What was the subject of the Supreme Court case Plessy v. Ferguson?", options: ["Freedom of speech", "Right to bear arms", "Segregation", "Women's suffrage"], correctAnswer: "Segregation", category: "History", difficulty: 5 },
  { id: "q5-9", text: "Who was the main rival of the United States during the Cold War?", options: ["Germany", "Japan", "Soviet Union", "China"], correctAnswer: "Soviet Union", category: "History", difficulty: 5 },
  { id: "q5-10", text: "In what year did the Great Depression begin?", options: ["1914", "1929", "1939", "1941"], correctAnswer: "1929", category: "History", difficulty: 5 },

  // Difficulty 6
  { id: "q6-1", text: "What is the minimum age required to be President of the United States?", options: ["30", "35", "40", "45"], correctAnswer: "35", category: "Government", difficulty: 6 },
  { id: "q6-2", text: "Which US state was once an independent republic for nine years?", options: ["California", "Texas", "Vermont", "Hawaii"], correctAnswer: "Texas", category: "History", difficulty: 6 },
  { id: "q6-3", text: "Who was the first African American to serve on the US Supreme Court?", options: ["Thurgood Marshall", "Clarence Thomas", "John Lewis", "Ralph Bunche"], correctAnswer: "Thurgood Marshall", category: "Government", difficulty: 6 },
  { id: "q6-4", text: "What is the most populous city in the United States?", options: ["Los Angeles", "Chicago", "Houston", "New York City"], correctAnswer: "New York City", category: "Geography", difficulty: 6 },
  { id: "q6-5", text: "Which President signed the Civil Rights Act of 1964?", options: ["John F. Kennedy", "Lyndon B. Johnson", "Richard Nixon", "Dwight D. Eisenhower"], correctAnswer: "Lyndon B. Johnson", category: "History", difficulty: 6 },
  { id: "q6-6", text: "Which amendment abolished slavery in the US?", options: ["12th", "13th", "14th", "15th"], correctAnswer: "13th", category: "Government", difficulty: 6 },
  { id: "q6-7", text: "Which amendment granted citizenship to all persons born in the US?", options: ["13th", "14th", "15th", "16th"], correctAnswer: "14th", category: "Government", difficulty: 6 },
  { id: "q6-8", text: "Which amendment prohibited the denial of voting rights based on race?", options: ["13th", "14th", "15th", "19th"], correctAnswer: "15th", category: "Government", difficulty: 6 },
  { id: "q6-9", text: "What was the period of rebuilding the South after the Civil War called?", options: ["The Gilded Age", "The Progressive Era", "Reconstruction", "The Great Awakening"], correctAnswer: "Reconstruction", category: "History", difficulty: 6 },
  { id: "q6-10", text: "What does the term 'Gilded Age' refer to in US history?", options: ["A period of religious revival", "A time of rapid economic growth and corruption", "The era of the American Revolution", "The period of westward expansion"], correctAnswer: "A time of rapid economic growth and corruption", category: "History", difficulty: 6 },

  // Difficulty 7
  { id: "q7-1", text: "How many members are in the US House of Representatives?", options: ["100", "435", "535", "538"], correctAnswer: "435", category: "Government", difficulty: 7 },
  { id: "q7-2", text: "Which US state was the last to be admitted to the Union?", options: ["Alaska", "Arizona", "New Mexico", "Hawaii"], correctAnswer: "Hawaii", category: "History", difficulty: 7 },
  { id: "q7-3", text: "Who was the first US Secretary of the Treasury?", options: ["Thomas Jefferson", "Alexander Hamilton", "John Jay", "James Madison"], correctAnswer: "Alexander Hamilton", category: "History", difficulty: 7 },
  { id: "q7-4", text: "What is the smallest US state by land area?", options: ["Delaware", "Rhode Island", "Connecticut", "New Hampshire"], correctAnswer: "Rhode Island", category: "Geography", difficulty: 7 },
  { id: "q7-5", text: "Which amendment established the federal income tax?", options: ["15th", "16th", "17th", "18th"], correctAnswer: "16th", category: "Government", difficulty: 7 },
  { id: "q7-6", text: "Who were the three main authors of the Federalist Papers?", options: ["Washington, Adams, Jefferson", "Hamilton, Madison, Jay", "Franklin, Hancock, Revere", "Lincoln, Grant, Sherman"], correctAnswer: "Hamilton, Madison, Jay", category: "History", difficulty: 7 },
  { id: "q7-7", text: "What was the significance of Marbury v. Madison?", options: ["It ended slavery", "It established judicial review", "It legalized segregation", "It defined the powers of the President"], correctAnswer: "It established judicial review", category: "Government", difficulty: 7 },
  { id: "q7-8", text: "What was the main message of the Monroe Doctrine?", options: ["US expansion to the Pacific", "Opposition to European colonialism in the Americas", "Neutrality in European wars", "The right to tax the colonies"], correctAnswer: "Opposition to European colonialism in the Americas", category: "History", difficulty: 7 },
  { id: "q7-9", text: "What was the belief that the US was destined to expand across the continent?", options: ["Manifest Destiny", "Imperialism", "Isolationism", "Federalism"], correctAnswer: "Manifest Destiny", category: "History", difficulty: 7 },
  { id: "q7-10", text: "What was the primary focus of the Seneca Falls Convention of 1848?", options: ["Abolition of slavery", "Temperance movement", "Women's rights", "Public education"], correctAnswer: "Women's rights", category: "History", difficulty: 7 },

  // Difficulty 8
  { id: "q8-1", text: "Who was the only US President to resign from office?", options: ["Andrew Johnson", "Richard Nixon", "Bill Clinton", "Donald Trump"], correctAnswer: "Richard Nixon", category: "History", difficulty: 8 },
  { id: "q8-2", text: "What is the term length for a US Senator?", options: ["2 years", "4 years", "6 years", "8 years"], correctAnswer: "6 years", category: "Government", difficulty: 8 },
  { id: "q8-3", text: "Which US state has the longest coastline?", options: ["California", "Florida", "Alaska", "Texas"], correctAnswer: "Alaska", category: "Geography", difficulty: 8 },
  { id: "q8-4", text: "Who was the first US President to be impeached?", options: ["Andrew Johnson", "Richard Nixon", "Bill Clinton", "Donald Trump"], correctAnswer: "Andrew Johnson", category: "History", difficulty: 8 },
  { id: "q8-5", text: "Which body has the sole power to try all impeachments?", options: ["The House of Representatives", "The Supreme Court", "The Senate", "The Department of Justice"], correctAnswer: "The Senate", category: "Government", difficulty: 8 },
  { id: "q8-6", text: "What was a major weakness of the Articles of Confederation?", options: ["Too much power for the President", "No power to tax", "A strong national military", "Too many branches of government"], correctAnswer: "No power to tax", category: "History", difficulty: 8 },
  { id: "q8-7", text: "What was the primary cause of Shays' Rebellion?", options: ["Religious persecution", "High taxes and debt for farmers", "The Stamp Act", "Slavery"], correctAnswer: "High taxes and debt for farmers", category: "History", difficulty: 8 },
  { id: "q8-8", text: "What was the main issue in the Whiskey Rebellion?", options: ["Prohibition", "A federal tax on domestic whiskey", "The quality of whiskey", "Import tariffs"], correctAnswer: "A federal tax on domestic whiskey", category: "History", difficulty: 8 },
  { id: "q8-9", text: "What was the XYZ Affair?", options: ["A secret land deal", "A diplomatic incident with France", "A spy mission in Britain", "A scandal involving the President"], correctAnswer: "A diplomatic incident with France", category: "History", difficulty: 8 },
  { id: "q8-10", text: "What did the Alien and Sedition Acts of 1798 do?", options: ["Encouraged immigration", "Restricted speech against the government", "Ended the slave trade", "Lowered taxes"], correctAnswer: "Restricted speech against the government", category: "History", difficulty: 8 },

  // Difficulty 9
  { id: "q9-1", text: "How many US Presidents have been assassinated while in office?", options: ["2", "3", "4", "5"], correctAnswer: "4", category: "History", difficulty: 9 },
  { id: "q9-2", text: "Which US state is the only one to have a unicameral legislature?", options: ["Vermont", "Nebraska", "Maine", "Oregon"], correctAnswer: "Nebraska", category: "Government", difficulty: 9 },
  { id: "q9-3", text: "Who was the first US President to live in the White House?", options: ["George Washington", "John Adams", "Thomas Jefferson", "James Madison"], correctAnswer: "John Adams", category: "History", difficulty: 9 },
  { id: "q9-4", text: "What is the name of the highest court in the United States?", options: ["Federal Court", "Appellate Court", "Supreme Court", "Constitutional Court"], correctAnswer: "Supreme Court", category: "Government", difficulty: 9 },
  { id: "q9-5", text: "Which US state was the first to grant women the right to vote?", options: ["Wyoming", "Colorado", "Utah", "Washington"], correctAnswer: "Wyoming", category: "History", difficulty: 9 },
  { id: "q9-6", text: "What was the Supreme Court's decision in the Dred Scott case?", options: ["Slaves were citizens", "Slaves were property and had no rights", "Segregation was legal", "The Missouri Compromise was valid"], correctAnswer: "Slaves were property and had no rights", category: "History", difficulty: 9 },
  { id: "q9-7", text: "What did the Supreme Court establish in McCulloch v. Maryland?", options: ["States can tax federal banks", "Federal law is superior to state law", "The President has absolute power", "Judicial review"], correctAnswer: "Federal law is superior to state law", category: "Government", difficulty: 9 },
  { id: "q9-8", text: "What was the focus of the Supreme Court case Gibbons v. Ogden?", options: ["Freedom of the press", "Interstate commerce", "Right to an attorney", "Religious freedom"], correctAnswer: "Interstate commerce", category: "Government", difficulty: 9 },
  { id: "q9-9", text: "What did the Kansas-Nebraska Act of 1854 allow?", options: ["The end of slavery", "Popular sovereignty to decide on slavery", "The admission of California", "The building of a canal"], correctAnswer: "Popular sovereignty to decide on slavery", category: "History", difficulty: 9 },
  { id: "q9-10", text: "What was a key part of the Compromise of 1850?", options: ["The Fugitive Slave Act", "The end of the Civil War", "The Louisiana Purchase", "The Bill of Rights"], correctAnswer: "The Fugitive Slave Act", category: "History", difficulty: 9 },

  // Difficulty 10
  { id: "q10-1", text: "Who was the youngest person to ever serve as President of the United States?", options: ["John F. Kennedy", "Theodore Roosevelt", "Bill Clinton", "Barack Obama"], correctAnswer: "Theodore Roosevelt", category: "History", difficulty: 10 },
  { id: "q10-2", text: "How many electoral votes are needed to win the US Presidency?", options: ["269", "270", "300", "538"], correctAnswer: "270", category: "Government", difficulty: 10 },
  { id: "q10-3", text: "Which US state has the most counties?", options: ["California", "Texas", "Georgia", "Virginia"], correctAnswer: "Texas", category: "Geography", difficulty: 10 },
  { id: "q10-4", text: "Who was the first US President to travel abroad while in office?", options: ["Theodore Roosevelt", "Woodrow Wilson", "Franklin D. Roosevelt", "Harry S. Truman"], correctAnswer: "Theodore Roosevelt", category: "History", difficulty: 10 },
  { id: "q10-5", text: "What is the only US state named after a President?", options: ["Lincoln", "Jefferson", "Washington", "Madison"], correctAnswer: "Washington", category: "Geography", difficulty: 10 },
  { id: "q10-6", text: "Who was the primary author of Federalist No. 10?", options: ["Alexander Hamilton", "James Madison", "John Jay", "Thomas Jefferson"], correctAnswer: "James Madison", category: "History", difficulty: 10 },
  { id: "q10-7", text: "How long did it take to ratify the 27th Amendment?", options: ["2 years", "50 years", "100 years", "202 years"], correctAnswer: "202 years", category: "Government", difficulty: 10 },
  { id: "q10-8", text: "Who is the only person to serve as both US President and Chief Justice?", options: ["John Quincy Adams", "William Howard Taft", "Andrew Jackson", "Herbert Hoover"], correctAnswer: "William Howard Taft", category: "History", difficulty: 10 },
  { id: "q10-9", text: "In what year was the first official US Census taken?", options: ["1776", "1783", "1790", "1800"], correctAnswer: "1790", category: "History", difficulty: 10 },
  { id: "q10-10", text: "What did the Northwest Ordinance of 1787 establish?", options: ["The tax code", "The process for admitting new states", "The national bank", "The US Navy"], correctAnswer: "The process for admitting new states", category: "History", difficulty: 10 }
];
