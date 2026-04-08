-- Seed 121 questions across 9 categories in 3 tiers
-- Tier 1 (primary): US History, Civics, Geography
-- Tier 2: Military, National Parks, Landmarks
-- Tier 3 (wildcard): American Culture, US Sports, Famous Americans
-- Difficulty: 1-3 = easy, 4-6 = medium, 7-9 = hard

-- Clear previous question bank before reseeding
DELETE FROM public.questions;

-- ============================================================
-- US HISTORY (20 questions: 7 easy, 7 medium, 6 hard)
-- ============================================================

-- Easy (diff 1–3)
INSERT INTO public.questions (text, options, correct_answer, category, difficulty) VALUES
('Who was the first President of the United States?',
 ARRAY['Thomas Jefferson','Benjamin Franklin','George Washington','John Adams'],
 'George Washington', 'US History', 1),

('In what year was the Declaration of Independence signed?',
 ARRAY['1770','1776','1783','1791'],
 '1776', 'US History', 1),

('Which war was fought between the Northern and Southern states of the United States?',
 ARRAY['The Revolutionary War','The War of 1812','The Civil War','The Mexican-American War'],
 'The Civil War', 'US History', 2),

('Who gave the famous "I Have a Dream" speech?',
 ARRAY['Malcolm X','Thurgood Marshall','John Lewis','Martin Luther King Jr.'],
 'Martin Luther King Jr.', 'US History', 2),

('What event triggered the United States'' entry into World War II?',
 ARRAY['The fall of France','The sinking of the Lusitania','The attack on Pearl Harbor','The invasion of Poland'],
 'The attack on Pearl Harbor', 'US History', 2),

('Which President issued the Emancipation Proclamation?',
 ARRAY['Ulysses S. Grant','Andrew Johnson','Abraham Lincoln','Millard Fillmore'],
 'Abraham Lincoln', 'US History', 3),

('What was the name of the first permanent English settlement in America?',
 ARRAY['Plymouth','Roanoke','Salem','Jamestown'],
 'Jamestown', 'US History', 3),

-- Medium (diff 4–6)
('In what year did the United States enter World War I?',
 ARRAY['1914','1915','1917','1918'],
 '1917', 'US History', 4),

('What was the name of the economic crisis that began with the stock market crash in 1929?',
 ARRAY['The Panic of 1907','The Great Recession','The Great Depression','Black Tuesday Collapse'],
 'The Great Depression', 'US History', 4),

('Which Amendment to the Constitution abolished slavery in the United States?',
 ARRAY['The 10th Amendment','The 13th Amendment','The 14th Amendment','The 15th Amendment'],
 'The 13th Amendment', 'US History', 5),

('Which US President was in office during the Cuban Missile Crisis of 1962?',
 ARRAY['Dwight D. Eisenhower','Lyndon B. Johnson','Richard Nixon','John F. Kennedy'],
 'John F. Kennedy', 'US History', 5),

('What was the name of the NASA program that first landed humans on the Moon?',
 ARRAY['Gemini','Mercury','Apollo','Artemis'],
 'Apollo', 'US History', 5),

('Which Native American leader helped defeat General Custer at the Battle of Little Bighorn?',
 ARRAY['Geronimo','Chief Joseph','Crazy Horse','Sitting Bull'],
 'Sitting Bull', 'US History', 6),

('In what year did the United States purchase Alaska from Russia?',
 ARRAY['1853','1867','1871','1898'],
 '1867', 'US History', 6),

-- Hard (diff 7–9)
('Which Supreme Court case ruled that racial segregation in public schools was unconstitutional?',
 ARRAY['Plessy v. Ferguson','Marbury v. Madison','Dred Scott v. Sandford','Brown v. Board of Education'],
 'Brown v. Board of Education', 'US History', 7),

('Who was the President of the United States when the Louisiana Purchase was made?',
 ARRAY['John Adams','James Madison','Thomas Jefferson','James Monroe'],
 'Thomas Jefferson', 'US History', 7),

('The Lewis and Clark Expedition set out in which year?',
 ARRAY['1800','1803','1804','1807'],
 '1804', 'US History', 8),

('Which act of 1765 imposed taxes on printed materials in the American colonies, fueling colonial anger?',
 ARRAY['The Townshend Acts','The Intolerable Acts','The Stamp Act','The Navigation Acts'],
 'The Stamp Act', 'US History', 8),

('Which two Founding Fathers died on the same day — July 4, 1826?',
 ARRAY['George Washington and Alexander Hamilton','Thomas Jefferson and John Adams','Benjamin Franklin and James Madison','John Hancock and Samuel Adams'],
 'Thomas Jefferson and John Adams', 'US History', 9),

('What was the name of the US policy, announced in 1823, warning European powers against colonizing the Americas?',
 ARRAY['The Adams Doctrine','The Washington Doctrine','The Monroe Doctrine','The Roosevelt Corollary'],
 'The Monroe Doctrine', 'US History', 9);

-- ============================================================
-- CIVICS (20 questions: 7 easy, 7 medium, 6 hard)
-- ============================================================

-- Easy (diff 1–3)
INSERT INTO public.questions (text, options, correct_answer, category, difficulty) VALUES
('How many amendments are in the Bill of Rights?',
 ARRAY['5','8','10','12'],
 '10', 'Civics', 1),

('What are the three branches of the US federal government?',
 ARRAY['State, Local, Federal','Executive, Legislative, Judicial','House, Senate, President','Military, Civil, Legal'],
 'Executive, Legislative, Judicial', 'Civics', 1),

('How long is a US Senator''s term in office?',
 ARRAY['2 years','4 years','6 years','8 years'],
 '6 years', 'Civics', 2),

('Who becomes President if the President is unable to serve?',
 ARRAY['The Speaker of the House','The Secretary of State','The Senate Majority Leader','The Vice President'],
 'The Vice President', 'Civics', 2),

('What is the minimum voting age in the United States?',
 ARRAY['16','17','18','21'],
 '18', 'Civics', 2),

('How many voting members are in the US House of Representatives?',
 ARRAY['100','270','435','538'],
 '435', 'Civics', 3),

('What is the supreme law of the United States?',
 ARRAY['The Declaration of Independence','The Bill of Rights','The Articles of Confederation','The Constitution'],
 'The Constitution', 'Civics', 3),

-- Medium (diff 4–6)
('What does the First Amendment primarily protect?',
 ARRAY['The right to bear arms','Freedom of speech, religion, press, assembly, and petition','The right to a speedy trial','Protection from unreasonable searches'],
 'Freedom of speech, religion, press, assembly, and petition', 'Civics', 4),

('How many Electoral College votes are needed to win the US presidency?',
 ARRAY['218','251','270','300'],
 '270', 'Civics', 4),

('How many justices currently serve on the US Supreme Court?',
 ARRAY['7','8','9','11'],
 '9', 'Civics', 5),

('How long is a US House Representative''s term in office?',
 ARRAY['1 year','2 years','4 years','6 years'],
 '2 years', 'Civics', 5),

('Which Amendment gave women the right to vote in the United States?',
 ARRAY['The 13th Amendment','The 15th Amendment','The 17th Amendment','The 19th Amendment'],
 'The 19th Amendment', 'Civics', 5),

('What is the constitutional process called when Congress formally charges the President with misconduct?',
 ARRAY['Censure','Recall','Impeachment','Filibuster'],
 'Impeachment', 'Civics', 6),

('What fraction of states must ratify an amendment to the Constitution for it to be adopted?',
 ARRAY['A simple majority (51%)','Two-thirds (67%)','Three-fourths (75%)','All 50 states (100%)'],
 'Three-fourths (75%)', 'Civics', 6),

-- Hard (diff 7–9)
('What is the minimum age required to serve as President of the United States?',
 ARRAY['25','30','35','40'],
 '35', 'Civics', 7),

('How many total members are in the Electoral College?',
 ARRAY['435','500','538','600'],
 '538', 'Civics', 7),

('Which constitutional clause is sometimes called the "Elastic Clause" because it allows Congress implied powers?',
 ARRAY['The Commerce Clause','The Supremacy Clause','The Necessary and Proper Clause','The General Welfare Clause'],
 'The Necessary and Proper Clause', 'Civics', 8),

('Which Supreme Court case established the principle of judicial review in the United States?',
 ARRAY['McCulloch v. Maryland','Gibbons v. Ogden','Marbury v. Madison','Fletcher v. Peck'],
 'Marbury v. Madison', 'Civics', 8),

('Which constitutional clause requires each state to respect the public acts and court decisions of other states?',
 ARRAY['The Commerce Clause','The Full Faith and Credit Clause','The Privileges and Immunities Clause','The Due Process Clause'],
 'The Full Faith and Credit Clause', 'Civics', 9),

('How many times can a President of the United States be elected?',
 ARRAY['Once','Twice','Three times','There is no limit'],
 'Twice', 'Civics', 9);

-- ============================================================
-- GEOGRAPHY (15 questions: 5 easy, 5 medium, 5 hard)
-- ============================================================

-- Easy (diff 1–3)
INSERT INTO public.questions (text, options, correct_answer, category, difficulty) VALUES
('What is the capital of the United States?',
 ARRAY['New York City','Philadelphia','Boston','Washington, D.C.'],
 'Washington, D.C.', 'Geography', 1),

('Which is the largest US state by land area?',
 ARRAY['Texas','California','Alaska','Montana'],
 'Alaska', 'Geography', 1),

('What river forms the border between the United States and Mexico?',
 ARRAY['The Colorado River','The Rio Grande','The Pecos River','The Arkansas River'],
 'The Rio Grande', 'Geography', 2),

('Which of the Great Lakes lies entirely within the United States?',
 ARRAY['Lake Superior','Lake Huron','Lake Erie','Lake Michigan'],
 'Lake Michigan', 'Geography', 2),

('What mountain range runs along the eastern side of the United States?',
 ARRAY['The Rocky Mountains','The Sierra Nevada','The Cascade Range','The Appalachian Mountains'],
 'The Appalachian Mountains', 'Geography', 3),

-- Medium (diff 4–6)
('What is the longest river in the United States?',
 ARRAY['The Mississippi River','The Missouri River','The Colorado River','The Ohio River'],
 'The Missouri River', 'Geography', 4),

('Which US state has the most miles of coastline?',
 ARRAY['Florida','California','Hawaii','Alaska'],
 'Alaska', 'Geography', 4),

('What is the smallest US state by total area?',
 ARRAY['Delaware','Connecticut','New Jersey','Rhode Island'],
 'Rhode Island', 'Geography', 5),

('What is the name of the deepest lake in the United States?',
 ARRAY['Lake Tahoe','Flathead Lake','Crater Lake','Lake Superior'],
 'Crater Lake', 'Geography', 5),

('What large desert covers parts of the southwestern United States?',
 ARRAY['The Chihuahuan Desert','The Great Basin Desert','The Sonoran Desert','The Mojave Desert'],
 'The Great Basin Desert', 'Geography', 6),

-- Hard (diff 7–9)
('What is the highest mountain peak in the contiguous United States?',
 ARRAY['Mount Rainier','Mount Whitney','Pikes Peak','Mount Elbert'],
 'Mount Whitney', 'Geography', 7),

('Which US state has the highest mean elevation above sea level?',
 ARRAY['Utah','Wyoming','Montana','Colorado'],
 'Colorado', 'Geography', 7),

('The geographic region nicknamed "Tornado Alley" is primarily located in which part of the United States?',
 ARRAY['The Pacific Northwest','The Southeast','The Great Plains','The Northeast'],
 'The Great Plains', 'Geography', 8),

('What is the only US state that borders exactly one other state?',
 ARRAY['Hawaii','Vermont','Maine','New Hampshire'],
 'Maine', 'Geography', 8),

('The Continental Divide runs through which major mountain range in the US?',
 ARRAY['The Appalachian Mountains','The Ozark Mountains','The Rocky Mountains','The Sierra Nevada'],
 'The Rocky Mountains', 'Geography', 9);

-- ============================================================
-- MILITARY (12 questions: 4 easy, 4 medium, 4 hard)
-- ============================================================

-- Easy (diff 1–3)
INSERT INTO public.questions (text, options, correct_answer, category, difficulty) VALUES
('In which war did the United States fight for independence from Britain?',
 ARRAY['The French and Indian War','The Civil War','The War of 1812','The Revolutionary War'],
 'The Revolutionary War', 'Military', 1),

('"D-Day" refers to which major Allied military operation in World War II?',
 ARRAY['The invasion of Sicily','The liberation of Paris','The Allied invasion of Normandy','The crossing of the Rhine'],
 'The Allied invasion of Normandy', 'Military', 2),

('Which branch of the US military is the oldest, established in 1775?',
 ARRAY['The Navy','The Marine Corps','The Army','The Air Force'],
 'The Army', 'Military', 2),

('Where is the United States Military Academy (West Point) located?',
 ARRAY['Virginia','Maryland','Pennsylvania','New York'],
 'New York', 'Military', 3),

-- Medium (diff 4–6)
('What was the strategic significance of the Battle of Midway in 1942?',
 ARRAY['It secured Europe for the Allies','It ended the war in Asia','It was the turning point in the Pacific theater','It opened the Second Front in Europe'],
 'It was the turning point in the Pacific theater', 'Military', 4),

('Which conflict in American history caused the greatest number of US military deaths?',
 ARRAY['World War II','World War I','The Vietnam War','The Civil War'],
 'The Civil War', 'Military', 5),

('Which war saw the United States fight in the Korean peninsula in the early 1950s?',
 ARRAY['The Vietnam War','The Korean War','The Cold War','The Gulf War'],
 'The Korean War', 'Military', 5),

('In which war did the United States first use the atomic bomb in combat?',
 ARRAY['The Korean War','The Cold War','World War I','World War II'],
 'World War II', 'Military', 6),

-- Hard (diff 7–9)
('What name was given to the US-led coalition''s operation to liberate Kuwait from Iraq in 1991?',
 ARRAY['Operation Enduring Freedom','Operation Iraqi Freedom','Operation Desert Storm','Operation Just Cause'],
 'Operation Desert Storm', 'Military', 7),

('Which battle, fought in September 1862, is considered the bloodiest single day in American military history?',
 ARRAY['The Battle of Gettysburg','The Battle of Shiloh','The Battle of Antietam','The Battle of Bull Run'],
 'The Battle of Antietam', 'Military', 8),

('What was the code name for the secret US program to develop the first nuclear weapon?',
 ARRAY['Operation Overlord','The Manhattan Project','Operation Paperclip','Project Trinity'],
 'The Manhattan Project', 'Military', 8),

('What was the name of the US island-hopping strategy used to advance across the Pacific toward Japan in WWII?',
 ARRAY['Operation Rolling Thunder','The Domino Strategy','Leapfrogging','The Pacific Offensive'],
 'Leapfrogging', 'Military', 9);

-- ============================================================
-- NATIONAL PARKS (12 questions: 4 easy, 4 medium, 4 hard)
-- ============================================================

-- Easy (diff 1–3)
INSERT INTO public.questions (text, options, correct_answer, category, difficulty) VALUES
('Yellowstone National Park is primarily located in which US state?',
 ARRAY['Montana','Idaho','Colorado','Wyoming'],
 'Wyoming', 'National Parks', 1),

('What is the name of the famous geyser in Yellowstone that erupts on a predictable schedule?',
 ARRAY['Castle Geyser','Steamboat Geyser','Old Faithful','Grand Geyser'],
 'Old Faithful', 'National Parks', 2),

('The Grand Canyon, one of the world''s most famous natural wonders, is in which state?',
 ARRAY['Utah','Nevada','New Mexico','Arizona'],
 'Arizona', 'National Parks', 2),

('Which national park contains the highest peak in North America, Denali?',
 ARRAY['Kenai Fjords National Park','Wrangell-St. Elias National Park','Denali National Park','Gates of the Arctic National Park'],
 'Denali National Park', 'National Parks', 3),

-- Medium (diff 4–6)
('What is the name of the national park in California famous for its giant sequoia trees?',
 ARRAY['Redwood National Park','Kings Canyon National Park','Yosemite National Park','Sequoia National Park'],
 'Sequoia National Park', 'National Parks', 4),

('In which state is Acadia National Park, featuring scenic rocky coastlines and Mount Cadillac, located?',
 ARRAY['Massachusetts','New Hampshire','Connecticut','Maine'],
 'Maine', 'National Parks', 5),

('Which national park is consistently the most visited in the United States?',
 ARRAY['Yellowstone National Park','Yosemite National Park','Grand Canyon National Park','Great Smoky Mountains National Park'],
 'Great Smoky Mountains National Park', 'National Parks', 5),

('Which national park, straddling Utah and Arizona, is famous for its towering sandstone mesas and buttes?',
 ARRAY['Arches National Park','Capitol Reef National Park','Monument Valley Navajo Tribal Park','Canyonlands National Park'],
 'Monument Valley Navajo Tribal Park', 'National Parks', 6),

-- Hard (diff 7–9)
('In what year was Yellowstone established as the world''s first national park?',
 ARRAY['1864','1868','1872','1890'],
 '1872', 'National Parks', 7),

('Which national park in Colorado preserves the largest collection of ancient cliff dwellings in the United States?',
 ARRAY['Rocky Mountain National Park','Black Canyon of the Gunnison','Great Sand Dunes National Park','Mesa Verde National Park'],
 'Mesa Verde National Park', 'National Parks', 7),

('How many national parks does the United States currently have (as of 2024)?',
 ARRAY['52','58','63','71'],
 '63', 'National Parks', 8),

('Which US national park is home to the world''s largest collection of natural arches?',
 ARRAY['Canyonlands National Park','Capitol Reef National Park','Zion National Park','Arches National Park'],
 'Arches National Park', 'National Parks', 9);

-- ============================================================
-- LANDMARKS (12 questions: 4 easy, 4 medium, 4 hard)
-- ============================================================

-- Easy (diff 1–3)
INSERT INTO public.questions (text, options, correct_answer, category, difficulty) VALUES
('In which US city is the Statue of Liberty located?',
 ARRAY['Boston','Philadelphia','Washington, D.C.','New York City'],
 'New York City', 'Landmarks', 1),

('Mount Rushmore, featuring the carved faces of four US Presidents, is located in which state?',
 ARRAY['Montana','Wyoming','Nebraska','South Dakota'],
 'South Dakota', 'Landmarks', 2),

('Which memorial on the National Mall in Washington, D.C. honors the 16th President?',
 ARRAY['The Washington Monument','The Jefferson Memorial','The Lincoln Memorial','The FDR Memorial'],
 'The Lincoln Memorial', 'Landmarks', 2),

('What is the name of the iconic suspension bridge spanning the entrance to San Francisco Bay?',
 ARRAY['The Bay Bridge','The Brooklyn Bridge','The Golden Gate Bridge','The Mackinac Bridge'],
 'The Golden Gate Bridge', 'Landmarks', 3),

-- Medium (diff 4–6)
('In which US city is the Space Needle observation tower located?',
 ARRAY['Portland','San Francisco','Denver','Seattle'],
 'Seattle', 'Landmarks', 4),

('What is the name of the massive stainless steel arch monument in St. Louis, Missouri?',
 ARRAY['The Freedom Arch','The Western Gateway','The Gateway Arch','The Manifest Destiny Monument'],
 'The Gateway Arch', 'Landmarks', 5),

('In which US city is the Liberty Bell, a symbol of American independence, on display?',
 ARRAY['Boston','Washington, D.C.','New York City','Philadelphia'],
 'Philadelphia', 'Landmarks', 5),

('What does the Gateway Arch in St. Louis primarily commemorate?',
 ARRAY['The founding of Missouri','The Lewis and Clark Expedition','American westward expansion','The end of the Civil War'],
 'American westward expansion', 'Landmarks', 6),

-- Hard (diff 7–9)
('In what year was the Statue of Liberty officially dedicated?',
 ARRAY['1876','1882','1886','1892'],
 '1886', 'Landmarks', 7),

('Which four presidents are depicted on Mount Rushmore?',
 ARRAY['Washington, Adams, Jefferson, Lincoln','Washington, Jefferson, Lincoln, Grant','Washington, Jefferson, Theodore Roosevelt, Lincoln','Washington, Jefferson, Madison, Monroe'],
 'Washington, Jefferson, Theodore Roosevelt, Lincoln', 'Landmarks', 7),

('The Space Needle in Seattle was originally built for which event?',
 ARRAY['The 1958 Pacific Exposition','The 1962 World''s Fair','The 1968 Summer Olympics','The 1974 World''s Fair'],
 'The 1962 World''s Fair', 'Landmarks', 8),

('In which Texas city is the Alamo, site of a famous 1836 battle for Texas independence, located?',
 ARRAY['Houston','Dallas','Austin','San Antonio'],
 'San Antonio', 'Landmarks', 9);

-- ============================================================
-- AMERICAN CULTURE (10 questions: 3 easy, 4 medium, 3 hard)
-- ============================================================

-- Easy (diff 1–3)
INSERT INTO public.questions (text, options, correct_answer, category, difficulty) VALUES
('What is the traditional main dish served at a Thanksgiving meal?',
 ARRAY['Ham','Roast beef','Turkey','Salmon'],
 'Turkey', 'American Culture', 1),

('Which sport is traditionally referred to as "America''s pastime"?',
 ARRAY['Football','Basketball','Baseball','Hockey'],
 'Baseball', 'American Culture', 2),

('What is the name of the street in New York City synonymous with American musical theater?',
 ARRAY['Fifth Avenue','Sunset Strip','Broadway','Bourbon Street'],
 'Broadway', 'American Culture', 3),

-- Medium (diff 4–6)
('What is the popular name for the day-after-Thanksgiving shopping event, one of the busiest retail days of the year?',
 ARRAY['Cyber Monday','Super Saturday','Shopping Saturday','Black Friday'],
 'Black Friday', 'American Culture', 4),

('Which American holiday is celebrated on the last Thursday of November?',
 ARRAY['Columbus Day','Veterans Day','Labor Day','Thanksgiving'],
 'Thanksgiving', 'American Culture', 4),

('Which US city is known worldwide as the birthplace of jazz music?',
 ARRAY['Chicago','Memphis','Nashville','New Orleans'],
 'New Orleans', 'American Culture', 5),

('What was the name of the 1969 outdoor music festival in New York that became a symbol of the counterculture movement?',
 ARRAY['Monterey Pop Festival','Coachella','Woodstock','Isle of Wight Festival'],
 'Woodstock', 'American Culture', 6),

-- Hard (diff 7–9)
('Which American literary prize is considered the most prestigious award for fiction, poetry, and journalism?',
 ARRAY['The National Book Award','The Man Booker Prize','The Pulitzer Prize','The PEN/Faulkner Award'],
 'The Pulitzer Prize', 'American Culture', 7),

('In which decade did rock and roll music emerge as a dominant force in American popular culture?',
 ARRAY['The 1940s','The 1950s','The 1960s','The 1970s'],
 'The 1950s', 'American Culture', 8),

('What is the name of the American abstract art movement that emerged in New York City in the 1940s and 1950s, the first to achieve worldwide influence?',
 ARRAY['Pop Art','Impressionism','Abstract Expressionism','Surrealism'],
 'Abstract Expressionism', 'American Culture', 9);

-- ============================================================
-- US SPORTS (10 questions: 3 easy, 4 medium, 3 hard)
-- ============================================================

-- Easy (diff 1–3)
INSERT INTO public.questions (text, options, correct_answer, category, difficulty) VALUES
('What sport is played in the NFL?',
 ARRAY['Basketball','Baseball','Soccer','American Football'],
 'American Football', 'US Sports', 1),

('How many players from one team are on a basketball court during an NBA game?',
 ARRAY['4','5','6','7'],
 '5', 'US Sports', 2),

('What is the name of the NFL championship game played every year?',
 ARRAY['The World Series','The Stanley Cup Final','The Super Bowl','The NBA Finals'],
 'The Super Bowl', 'US Sports', 3),

-- Medium (diff 4–6)
('How many NBA championship rings did Michael Jordan win with the Chicago Bulls?',
 ARRAY['4','5','6','7'],
 '6', 'US Sports', 4),

('In which sport do teams compete for the Stanley Cup?',
 ARRAY['Basketball','Baseball','American Football','Ice Hockey'],
 'Ice Hockey', 'US Sports', 4),

('Which NFL team has won the most Super Bowl championships?',
 ARRAY['Dallas Cowboys','San Francisco 49ers','Pittsburgh Steelers','New England Patriots'],
 'New England Patriots', 'US Sports', 5),

('In what year were the Summer Olympic Games held in Atlanta, Georgia?',
 ARRAY['1988','1992','1996','2000'],
 '1996', 'US Sports', 6),

-- Hard (diff 7–9)
('Who was the first African American to play in Major League Baseball in the modern era?',
 ARRAY['Willie Mays','Hank Aaron','Satchel Paige','Jackie Robinson'],
 'Jackie Robinson', 'US Sports', 7),

('Who holds the NFL record for the most career receiving touchdowns?',
 ARRAY['Randy Moss','Jerry Rice','Terrell Owens','Cris Carter'],
 'Jerry Rice', 'US Sports', 8),

('Which US city hosted both the Summer Olympics in 1932 and the Winter Olympics in 1932?',
 ARRAY['New York City','Chicago','Los Angeles','Lake Placid and Los Angeles'],
 'Lake Placid and Los Angeles', 'US Sports', 9);

-- ============================================================
-- FAMOUS AMERICANS (10 questions: 3 easy, 4 medium, 3 hard)
-- ============================================================

-- Easy (diff 1–3)
INSERT INTO public.questions (text, options, correct_answer, category, difficulty) VALUES
('Who is credited with inventing the telephone in 1876?',
 ARRAY['Thomas Edison','Nikola Tesla','Samuel Morse','Alexander Graham Bell'],
 'Alexander Graham Bell', 'Famous Americans', 1),

('Who was the first American woman to fly solo across the Atlantic Ocean?',
 ARRAY['Bessie Coleman','Harriet Quimby','Jacqueline Cochran','Amelia Earhart'],
 'Amelia Earhart', 'Famous Americans', 2),

('Which Native American woman served as a guide for the Lewis and Clark Expedition?',
 ARRAY['Pocahontas','Sitting Bull''s wife','Sacagawea','Wilma Mankiller'],
 'Sacagawea', 'Famous Americans', 3),

-- Medium (diff 4–6)
('Who wrote the classic American novel "The Great Gatsby"?',
 ARRAY['Ernest Hemingway','John Steinbeck','William Faulkner','F. Scott Fitzgerald'],
 'F. Scott Fitzgerald', 'Famous Americans', 4),

('Which American astronaut was the first human to walk on the Moon in 1969?',
 ARRAY['Buzz Aldrin','John Glenn','Alan Shepard','Neil Armstrong'],
 'Neil Armstrong', 'Famous Americans', 4),

('Who is known as the "Father of the Blues" for his major role in developing the blues music form?',
 ARRAY['Robert Johnson','Muddy Waters','Louis Armstrong','W.C. Handy'],
 'W.C. Handy', 'Famous Americans', 5),

('Which American civil rights leader was awarded the Nobel Peace Prize in 1964?',
 ARRAY['Malcolm X','John Lewis','Thurgood Marshall','Martin Luther King Jr.'],
 'Martin Luther King Jr.', 'Famous Americans', 6),

-- Hard (diff 7–9)
('Which American author, who wrote "The Old Man and the Sea," won the Nobel Prize in Literature in 1954?',
 ARRAY['John Steinbeck','William Faulkner','F. Scott Fitzgerald','Ernest Hemingway'],
 'Ernest Hemingway', 'Famous Americans', 7),

('Who was the first US Secretary of State, serving under President George Washington?',
 ARRAY['Alexander Hamilton','John Jay','James Madison','Thomas Jefferson'],
 'Thomas Jefferson', 'Famous Americans', 8),

('Which American scientist and activist, who co-discovered the structure of DNA, was later denied full credit due to her gender?',
 ARRAY['Marie Curie','Barbara McClintock','Rosalind Franklin','Lise Meitner'],
 'Rosalind Franklin', 'Famous Americans', 9);
