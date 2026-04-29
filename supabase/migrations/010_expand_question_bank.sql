-- Expand question bank with additional questions
-- Adds ~180 US History + ~292 Culture/Sports/Famous Americans questions
-- Difficulty: 1-3 = easy, 4-6 = medium, 7-9 = hard

-- ============================================================
-- US HISTORY (additional questions)
-- ============================================================

INSERT INTO public.questions (text, options, correct_answer, category, difficulty) VALUES
('Which document, written primarily by Thomas Jefferson, declared the colonies'' independence from Britain?',
 ARRAY['The Articles of Confederation','The Declaration of Independence','The Federalist Papers','The Mayflower Compact'],
 'The Declaration of Independence', 'US History', 1),


('Which ocean borders the eastern coast of the United States?',
 ARRAY['Pacific Ocean','Indian Ocean','Arctic Ocean','Atlantic Ocean'],
 'Atlantic Ocean', 'US History', 1),

('Who was the commander of the Continental Army during the Revolutionary War?',
 ARRAY['John Adams','Benjamin Franklin','George Washington','Thomas Jefferson'],
 'George Washington', 'US History', 1),

('What event started the American Civil War?',
 ARRAY['The assassination of Abraham Lincoln','The attack on Fort Sumter','The Battle of Gettysburg','The Missouri Compromise'],
 'The attack on Fort Sumter', 'US History', 1),

('Which amendment to the Constitution gave women the right to vote?',
 ARRAY['15th Amendment','17th Amendment','18th Amendment','19th Amendment'],
 '19th Amendment', 'US History', 1),

('Who was the 16th President of the United States?',
 ARRAY['Ulysses S. Grant','James Buchanan','Abraham Lincoln','Andrew Johnson'],
 'Abraham Lincoln', 'US History', 1),

('What colonial document signed in 1620 established self-governance for Plymouth Colony?',
 ARRAY['The Mayflower Compact','The Maryland Charter','The Fundamental Orders','The Albany Plan'],
 'The Mayflower Compact', 'US History', 1),

('Which country gave the Statue of Liberty to the United States?',
 ARRAY['Spain','Great Britain','France','Germany'],
 'France', 'US History', 1),

('In what city was the Declaration of Independence signed?',
 ARRAY['Boston','New York','Washington D.C.','Philadelphia'],
 'Philadelphia', 'US History', 1),

('Which President is featured on the $1 bill?',
 ARRAY['Thomas Jefferson','Abraham Lincoln','Andrew Jackson','George Washington'],
 'George Washington', 'US History', 1),

('What war was fought between the United States and Great Britain from 1812 to 1815?',
 ARRAY['The French and Indian War','The Revolutionary War','The War of 1812','The Mexican-American War'],
 'The War of 1812', 'US History', 1),

('Which state was the last to be admitted to the Union?',
 ARRAY['Alaska','Hawaii','New Mexico','Arizona'],
 'Hawaii', 'US History', 1),

('What were the first ten amendments to the Constitution called?',
 ARRAY['The Federalist Papers','The Articles of Confederation','The Bill of Rights','The Declaration of Rights'],
 'The Bill of Rights', 'US History', 1),

('Who invented the telephone and became a symbol of American innovation in the Gilded Age?',
 ARRAY['Thomas Edison','Nikola Tesla','Alexander Graham Bell','Samuel Morse'],
 'Alexander Graham Bell', 'US History', 1),

('Which President ordered the dropping of atomic bombs on Japan in 1945?',
 ARRAY['Franklin D. Roosevelt','Dwight D. Eisenhower','Harry S. Truman','Herbert Hoover'],
 'Harry S. Truman', 'US History', 1),

('What famous speech did Abraham Lincoln deliver at the dedication of the Soldiers'' National Cemetery in 1863?',
 ARRAY['The Emancipation Address','The Gettysburg Address','The Second Inaugural Address','The Cooper Union Address'],
 'The Gettysburg Address', 'US History', 1),

('Which President established the New Deal in response to the Great Depression?',
 ARRAY['Herbert Hoover','Woodrow Wilson','Harry S. Truman','Franklin D. Roosevelt'],
 'Franklin D. Roosevelt', 'US History', 1),

('What system of escape routes helped enslaved people flee to freedom in the North?',
 ARRAY['The Freedom Trail','The Abolitionist Network','The Underground Railroad','The Liberty Path'],
 'The Underground Railroad', 'US History', 1),

('Which territory did the US acquire from Spain following the Spanish-American War of 1898?',
 ARRAY['Cuba and Panama','Hawaii and Alaska','Puerto Rico and Guam','Jamaica and Bermuda'],
 'Puerto Rico and Guam', 'US History', 1);

INSERT INTO public.questions (text, options, correct_answer, category, difficulty) VALUES
('Who was the first American to walk in space?',
 ARRAY['John Glenn','Neil Armstrong','Ed White','Alan Shepard'],
 'Ed White', 'US History', 2),

('What was the name of the policy that sought to contain the spread of communism during the Cold War?',
 ARRAY['The Marshall Plan','The Truman Doctrine','The Monroe Doctrine','Détente'],
 'The Truman Doctrine', 'US History', 2),

('Which 1944 Allied operation involved a massive amphibious invasion of Nazi-occupied France?',
 ARRAY['Operation Barbarossa','Operation Overlord','Operation Market Garden','Operation Torch'],
 'Operation Overlord', 'US History', 2),

('What legislation passed in 1964 outlawed discrimination based on race, color, religion, sex, or national origin?',
 ARRAY['The Voting Rights Act','The Civil Rights Act of 1964','The Fair Housing Act','The Equal Rights Amendment'],
 'The Civil Rights Act of 1964', 'US History', 2),

('Which President signed the Homestead Act of 1862, providing free land to settlers in the West?',
 ARRAY['James Buchanan','Ulysses S. Grant','Abraham Lincoln','Andrew Johnson'],
 'Abraham Lincoln', 'US History', 2),

('What term describes the period of rapid industrial growth and corporate consolidation following the Civil War?',
 ARRAY['The Progressive Era','The Reconstruction Era','The Gilded Age','The Roaring Twenties'],
 'The Gilded Age', 'US History', 2),

('Who led the U.S. forces in the Pacific Theater during World War II?',
 ARRAY['General George Patton','General Omar Bradley','General Dwight Eisenhower','General Douglas MacArthur'],
 'General Douglas MacArthur', 'US History', 2),

('Which 1920s constitutional amendment prohibited the manufacture and sale of alcohol?',
 ARRAY['17th Amendment','18th Amendment','19th Amendment','20th Amendment'],
 '18th Amendment', 'US History', 2),

('What was the name of the first artificial Earth satellite launched by the Soviet Union in 1957, which shocked the US?',
 ARRAY['Luna 1','Vostok 1','Sputnik','Explorer 1'],
 'Sputnik', 'US History', 2),

('Who was the only US President to resign from office?',
 ARRAY['Andrew Johnson','Bill Clinton','Richard Nixon','Lyndon B. Johnson'],
 'Richard Nixon', 'US History', 2),

('Which Native American people fought the US Army at the Battle of Little Bighorn in 1876?',
 ARRAY['Apache and Comanche','Sioux and Cheyenne','Nez Perce and Crow','Shawnee and Delaware'],
 'Sioux and Cheyenne', 'US History', 2),

('What was the name of the US economic recovery program that provided aid to rebuild Western Europe after WWII?',
 ARRAY['The Lend-Lease Act','The Truman Doctrine','The Marshall Plan','The NATO Agreement'],
 'The Marshall Plan', 'US History', 2),

('Which President oversaw the construction of the Panama Canal?',
 ARRAY['William Howard Taft','Woodrow Wilson','William McKinley','Theodore Roosevelt'],
 'Theodore Roosevelt', 'US History', 2),

('In what year did the United States formally enter World War II?',
 ARRAY['1939','1940','1941','1942'],
 '1941', 'US History', 2),

('What was the primary goal of the Reconstruction Amendments (13th, 14th, 15th) passed after the Civil War?',
 ARRAY['To punish Southern states financially','To integrate formerly enslaved people into citizenship','To restore the Southern economy','To create new territories in the West'],
 'To integrate formerly enslaved people into citizenship', 'US History', 2),

('Which American frontiersman and folk hero died at the Battle of the Alamo in 1836?',
 ARRAY['Daniel Boone','Kit Carson','Jim Bowie','Davy Crockett'],
 'Davy Crockett', 'US History', 2),

('What was the name given to the decade of the 1920s, characterized by prosperity, jazz, and social change?',
 ARRAY['The Golden Age','The Gilded Age','The Roaring Twenties','The Progressive Era'],
 'The Roaring Twenties', 'US History', 2),

('Which Supreme Court case in 1973 established a woman''s constitutional right to an abortion?',
 ARRAY['Griswold v. Connecticut','Planned Parenthood v. Casey','Roe v. Wade','Webster v. Reproductive Health Services'],
 'Roe v. Wade', 'US History', 2),

('Who was the commanding general of Union forces for much of the Civil War?',
 ARRAY['William T. Sherman','George McClellan','Philip Sheridan','Ulysses S. Grant'],
 'Ulysses S. Grant', 'US History', 2),

('What 1965 legislation removed racial barriers to voting, particularly in the South?',
 ARRAY['Civil Rights Act of 1964','Fair Housing Act of 1968','24th Amendment','Voting Rights Act of 1965'],
 'Voting Rights Act of 1965', 'US History', 2);

INSERT INTO public.questions (text, options, correct_answer, category, difficulty) VALUES
('Which President initiated the "Great Society" domestic programs, including Medicare and Medicaid?',
 ARRAY['John F. Kennedy','Richard Nixon','Lyndon B. Johnson','Jimmy Carter'],
 'Lyndon B. Johnson', 'US History', 3),

('What was the significance of the Supreme Court ruling in Marbury v. Madison (1803)?',
 ARRAY['It established freedom of the press','It abolished the slave trade','It established the principle of judicial review','It created the system of checks and balances'],
 'It established the principle of judicial review', 'US History', 3),

('Which amendment to the Constitution abolished Prohibition?',
 ARRAY['20th Amendment','21st Amendment','22nd Amendment','23rd Amendment'],
 '21st Amendment', 'US History', 3),

('Who were the primary authors of the Federalist Papers defending the new Constitution?',
 ARRAY['Benjamin Franklin and John Adams','Thomas Jefferson and James Madison','Alexander Hamilton, James Madison, and John Jay','George Washington and John Marshall'],
 'Alexander Hamilton, James Madison, and John Jay', 'US History', 3),

('What policy, announced in 1823, stated that the Western Hemisphere was closed to further European colonization?',
 ARRAY['The Truman Doctrine','The Monroe Doctrine','The Roosevelt Corollary','The Open Door Policy'],
 'The Monroe Doctrine', 'US History', 3),

('Which event in 1770, where British soldiers killed five colonists, inflamed anti-British sentiment?',
 ARRAY['The Boston Tea Party','The Battle of Lexington','The Boston Massacre','The Intolerable Acts'],
 'The Boston Massacre', 'US History', 3),

('What was the name of the famous march led by Martin Luther King Jr. from Selma to Montgomery in 1965?',
 ARRAY['The Freedom March','The March on Washington','The Selma to Montgomery March','Bloody Sunday March'],
 'The Selma to Montgomery March', 'US History', 3),

('Which President signed the Indian Removal Act of 1830, leading to the Trail of Tears?',
 ARRAY['John Quincy Adams','Martin Van Buren','James K. Polk','Andrew Jackson'],
 'Andrew Jackson', 'US History', 3),

('What was the name of the US government program during WWII that interned Japanese Americans?',
 ARRAY['Executive Order 9066','Operation Relocation','The Japanese Containment Act','War Relocation Program'],
 'Executive Order 9066', 'US History', 3),

('Who was the first African American to serve as a Justice on the US Supreme Court?',
 ARRAY['Clarence Thomas','Thurgood Marshall','John Marshall Harlan','Louis Brandeis'],
 'Thurgood Marshall', 'US History', 3),

('What was the name of the 1944 law that provided veterans with education, housing, and employment benefits?',
 ARRAY['The Veterans Benefits Act','The Servicemen''s Act','The GI Bill','The American Readjustment Act'],
 'The GI Bill', 'US History', 3),

('Which US President was assassinated in Dallas, Texas, in November 1963?',
 ARRAY['Dwight D. Eisenhower','Lyndon B. Johnson','Robert F. Kennedy','John F. Kennedy'],
 'John F. Kennedy', 'US History', 3),

('What term describes the period of political witch-hunting and anti-communist hysteria in the early 1950s?',
 ARRAY['The Red Scare','The Palmer Raids','McCarthyism','The Hollywood Blacklist'],
 'McCarthyism', 'US History', 3),

('Which agreement ended the Mexican-American War and gave the US California and much of the Southwest?',
 ARRAY['The Treaty of Guadalupe Hidalgo','The Gadsden Purchase','The Adams-Onís Treaty','The Treaty of Paris'],
 'The Treaty of Guadalupe Hidalgo', 'US History', 3),

('What famous muckraking novel by Upton Sinclair exposed conditions in the meatpacking industry?',
 ARRAY['The Jungle','The Octopus','How the Other Half Lives','The Shame of the Cities'],
 'The Jungle', 'US History', 3),

('Who was the first American woman to win a Nobel Prize, known for her social reform work at Hull House?',
 ARRAY['Susan B. Anthony','Elizabeth Cady Stanton','Jane Addams','Florence Kelley'],
 'Jane Addams', 'US History', 3),

('Which constitutional amendment established direct election of US Senators by popular vote?',
 ARRAY['15th Amendment','16th Amendment','17th Amendment','18th Amendment'],
 '17th Amendment', 'US History', 3),

('What term was used for the corrupt political bosses who controlled cities in the Gilded Age?',
 ARRAY['Progressive reformers','Robber barons','Political bosses','Trust busters'],
 'Political bosses', 'US History', 3),

('Which transcontinental railroad project was completed in 1869 at Promontory Summit, Utah?',
 ARRAY['The Southern Pacific Railroad','The First Transcontinental Railroad','The Northern Pacific Railroad','The Santa Fe Railroad'],
 'The First Transcontinental Railroad', 'US History', 3),

('Who was the leader of the Confederate Army during the Civil War?',
 ARRAY['Jefferson Davis','Stonewall Jackson','P.G.T. Beauregard','Robert E. Lee'],
 'Robert E. Lee', 'US History', 3);

INSERT INTO public.questions (text, options, correct_answer, category, difficulty) VALUES
('Which 1887 law attempted to regulate railroad monopolies by establishing the Interstate Commerce Commission?',
 ARRAY['The Sherman Antitrust Act','The Interstate Commerce Act','The Clayton Antitrust Act','The Railroad Regulation Act'],
 'The Interstate Commerce Act', 'US History', 4),

('What was the name of the political party founded by farmers and laborers in the 1890s to challenge corporate power?',
 ARRAY['The Greenback Party','The Socialist Party','The Populist Party','The Progressive Party'],
 'The Populist Party', 'US History', 4),

('Which 1944 Supreme Court case upheld the constitutionality of Japanese American internment?',
 ARRAY['Ex parte Milligan','Hirabayashi v. United States','Korematsu v. United States','Ex parte Quirin'],
 'Korematsu v. United States', 'US History', 4),

('Who was the African American leader who advocated for Black self-reliance and vocational education at the Tuskegee Institute?',
 ARRAY['W.E.B. Du Bois','Marcus Garvey','Booker T. Washington','Frederick Douglass'],
 'Booker T. Washington', 'US History', 4),

('Which constitutional amendment established the federal income tax?',
 ARRAY['13th Amendment','14th Amendment','16th Amendment','17th Amendment'],
 '16th Amendment', 'US History', 4),

('Which US military operation in 1961, supported by the CIA, attempted to overthrow Fidel Castro?',
 ARRAY['Operation Mongoose','The Bay of Pigs Invasion','Operation Zapata','The Cuba Blockade'],
 'The Bay of Pigs Invasion', 'US History', 4),

('What was the primary cause of the Dust Bowl that devastated the Great Plains in the 1930s?',
 ARRAY['Flooding from the Mississippi River','A combination of severe drought and poor farming practices','Volcanic ash from eruptions in Mexico','Insect infestations destroying crops'],
 'A combination of severe drought and poor farming practices', 'US History', 4),

('Which US President first used the term "Bully Pulpit" to describe the presidency as a platform for reform?',
 ARRAY['Woodrow Wilson','William Howard Taft','Theodore Roosevelt','William McKinley'],
 'Theodore Roosevelt', 'US History', 4),

('What was the significance of the Seneca Falls Convention of 1848?',
 ARRAY['It called for the abolition of slavery','It established the first labor union','It launched the women''s suffrage movement','It founded the Republican Party'],
 'It launched the women''s suffrage movement', 'US History', 4),

('Which naval battle in June 1942 turned the tide of the Pacific War in favor of the United States?',
 ARRAY['Battle of Coral Sea','Battle of Guadalcanal','Battle of Leyte Gulf','Battle of Midway'],
 'Battle of Midway', 'US History', 4),

('What was the name of the Cold War grand strategy that promised US support to countries threatened by communism?',
 ARRAY['The Eisenhower Doctrine','The Nixon Doctrine','Massive Retaliation','Containment'],
 'Containment', 'US History', 4),

('Who led the famous non-violent Montgomery Bus Boycott of 1955–1956?',
 ARRAY['Malcolm X','Medgar Evers','Martin Luther King Jr.','Ralph Abernathy'],
 'Martin Luther King Jr.', 'US History', 4),

('Which act, passed in 1862, granted federal land to states to fund agricultural and mechanical colleges?',
 ARRAY['The Homestead Act','The Pacific Railway Act','The Morrill Land-Grant Act','The Agricultural College Act'],
 'The Morrill Land-Grant Act', 'US History', 4),

('What was the name of the political compromise that admitted California as a free state and strengthened the Fugitive Slave Law?',
 ARRAY['The Missouri Compromise','The Kansas-Nebraska Act','The Compromise of 1850','The Crittenden Compromise'],
 'The Compromise of 1850', 'US History', 4),

('Which President signed the Social Security Act of 1935?',
 ARRAY['Herbert Hoover','Harry S. Truman','Franklin D. Roosevelt','Woodrow Wilson'],
 'Franklin D. Roosevelt', 'US History', 4),

('What was the name of the wartime alliance between the US, UK, and Soviet Union during WWII?',
 ARRAY['The Axis Powers','The Triple Entente','The Allied Powers','The Grand Alliance'],
 'The Grand Alliance', 'US History', 4),

('Who was the first African American woman elected to Congress?',
 ARRAY['Shirley Chisholm','Barbara Jordan','Fannie Lou Hamer','Constance Baker Motley'],
 'Shirley Chisholm', 'US History', 4),

('What was the significance of the 1819 Supreme Court case McCulloch v. Maryland?',
 ARRAY['It established freedom of religion','It upheld federal power over state power and implied powers of Congress','It ruled the slave trade unconstitutional','It established the right to a fair trial'],
 'It upheld federal power over state power and implied powers of Congress', 'US History', 4),

('Which agreement divided Korea at the 38th parallel following the Korean War?',
 ARRAY['The Treaty of Panmunjom','The Korean Armistice Agreement','The Seoul Peace Accord','The Inchon Agreement'],
 'The Korean Armistice Agreement', 'US History', 4),

('What name was given to the group of African American soldiers who served in segregated units during the Indian Wars on the western frontier?',
 ARRAY['The Tuskegee Airmen','The Buffalo Soldiers','The Harlem Hellfighters','The Triple Nickles'],
 'The Buffalo Soldiers', 'US History', 4);

INSERT INTO public.questions (text, options, correct_answer, category, difficulty) VALUES
('What was the name of the 1920s cultural movement centered in Harlem that celebrated African American art, music, and literature?',
 ARRAY['The Black Power Movement','The Harlem Renaissance','The Great Migration','The New Negro Movement'],
 'The Harlem Renaissance', 'US History', 5),

('Which constitutional principle divides power between federal and state governments?',
 ARRAY['Separation of powers','Checks and balances','Federalism','Popular sovereignty'],
 'Federalism', 'US History', 5),

('What was the name of the US government''s covert program during the Vietnam War to neutralize Viet Cong infrastructure?',
 ARRAY['Operation Rolling Thunder','Operation Phoenix','Operation Arc Light','Operation Linebacker'],
 'Operation Phoenix', 'US History', 5),

('Who was the African American woman whose refusal to give up her bus seat sparked the Montgomery Bus Boycott?',
 ARRAY['Claudette Colvin','Fannie Lou Hamer','Rosa Parks','Ida B. Wells'],
 'Rosa Parks', 'US History', 5),

('What was the term for the US strategy in Vietnam of withdrawing American troops while training South Vietnamese forces?',
 ARRAY['Pacification','Vietnamization','Escalation','Containment'],
 'Vietnamization', 'US History', 5),

('Which 1890 census announcement declared that what geographical feature had disappeared from the American landscape?',
 ARRAY['The Native American population','The frontier','Free land for homesteaders','Agricultural communities'],
 'The frontier', 'US History', 5),

('What was the name of the Nixon administration''s committee for re-election that engaged in political sabotage?',
 ARRAY['The Plumbers Unit','COINTELPRO','CREEP','Operation Chaos'],
 'CREEP', 'US History', 5),

('Which act of 1882 prohibited Chinese laborers from immigrating to the United States?',
 ARRAY['The Immigration Restriction Act','The Alien Contract Labor Law','The Chinese Exclusion Act','The Oriental Exclusion Act'],
 'The Chinese Exclusion Act', 'US History', 5),

('What was the name of the 1960s federal domestic volunteer program analogous to the Peace Corps?',
 ARRAY['The Peace Corps','AmeriCorps','VISTA','The Job Corps'],
 'VISTA', 'US History', 5),

('Which World War I treaty imposed harsh reparations on Germany?',
 ARRAY['The Treaty of Brest-Litovsk','The Treaty of Versailles','The Treaty of Saint-Germain','The Locarno Treaties'],
 'The Treaty of Versailles', 'US History', 5),

('Who was President of the United States during the Spanish-American War of 1898?',
 ARRAY['Grover Cleveland','Theodore Roosevelt','Benjamin Harrison','William McKinley'],
 'William McKinley', 'US History', 5),

('What is the formal name of the body established by the Constitution to elect the President?',
 ARRAY['The Federal Assembly','The Electoral College','The Congressional Caucus','The Presidential Electors'],
 'The Electoral College', 'US History', 5),

('Which New Deal agency employed young men in conservation work, planting trees and building parks?',
 ARRAY['The Works Progress Administration','The Tennessee Valley Authority','The Civilian Conservation Corps','The Public Works Administration'],
 'The Civilian Conservation Corps', 'US History', 5),

('What was the name of the key 1972 diplomatic agreement that opened US relations with communist China?',
 ARRAY['Détente','Ping-Pong Diplomacy','Opening to China','The Shanghai Communiqué'],
 'The Shanghai Communiqué', 'US History', 5),

('Which amendment, ratified in 1870, granted African American men the right to vote?',
 ARRAY['13th Amendment','14th Amendment','15th Amendment','16th Amendment'],
 '15th Amendment', 'US History', 5),

('What was the name of the 1950 US security policy document that called for massive military spending to counter the Soviet threat?',
 ARRAY['NSC-68','The Truman Doctrine','The Policy of Containment','The Eisenhower Doctrine'],
 'NSC-68', 'US History', 5),

('Who was the labor leader who organized the United Farm Workers union to advocate for migrant workers?',
 ARRAY['Samuel Gompers','Eugene V. Debs','Cesar Chavez','Walter Reuther'],
 'Cesar Chavez', 'US History', 5),

('What was the name of the scandal involving the break-in at Democratic Party headquarters that led to Nixon''s resignation?',
 ARRAY['Iran-Contra','Whitewater','Watergate','Teapot Dome'],
 'Watergate', 'US History', 5),

('Which President signed the National Security Act of 1947, which created the CIA and the National Security Council?',
 ARRAY['Franklin D. Roosevelt','Harry S. Truman','Dwight D. Eisenhower','John F. Kennedy'],
 'Harry S. Truman', 'US History', 5),

('What was the name of the Progressive Era reform movement that used journalism to expose corruption and social problems?',
 ARRAY['Yellow journalism','Advocacy journalism','Muckraking','Investigative reporting'],
 'Muckraking', 'US History', 5);

INSERT INTO public.questions (text, options, correct_answer, category, difficulty) VALUES
('What was the name of the massive US infrastructure project in the 1930s that built dams and provided electricity to the Tennessee Valley?',
 ARRAY['The Rural Electrification Administration','The Tennessee Valley Authority','The Public Works Administration','The Boulder Dam Project'],
 'The Tennessee Valley Authority', 'US History', 6),

('Which President signed the Civil Rights Act of 1957, the first civil rights legislation since Reconstruction?',
 ARRAY['Harry S. Truman','Dwight D. Eisenhower','John F. Kennedy','Lyndon B. Johnson'],
 'Dwight D. Eisenhower', 'US History', 6),

('What was the name of the 1970 event at Kent State University where National Guard soldiers killed four student protesters?',
 ARRAY['The Free Speech Movement','The Kent State Massacre','Operation CHAOS','The Cambodia Incursion Protests'],
 'The Kent State Massacre', 'US History', 6),

('Which constitutional convention conflict led to the Three-Fifths Compromise?',
 ARRAY['How to count enslaved people for taxation and representation','How to divide powers between branches','How to regulate interstate commerce','How to ratify the new Constitution'],
 'How to count enslaved people for taxation and representation', 'US History', 6),

('What was the name of the US Navy ship that exploded in Havana harbor in 1898, helping to trigger the Spanish-American War?',
 ARRAY['USS Maine','USS Oregon','USS Olympia','USS Indiana'],
 'USS Maine', 'US History', 6),

('Who wrote "Common Sense," the 1776 pamphlet urging American independence?',
 ARRAY['Benjamin Franklin','Thomas Jefferson','John Adams','Thomas Paine'],
 'Thomas Paine', 'US History', 6),

('What was the name of the first major battle of the Civil War, fought near Manassas, Virginia?',
 ARRAY['Battle of Shiloh','Battle of Antietam','First Battle of Bull Run','Battle of Chancellorsville'],
 'First Battle of Bull Run', 'US History', 6),

('Which Progressive Era amendment gave Congress the power to levy an income tax?',
 ARRAY['15th Amendment','16th Amendment','17th Amendment','18th Amendment'],
 '16th Amendment', 'US History', 6),

('What was the name of the US foreign policy under Reagan that sought to support anti-communist rebels worldwide?',
 ARRAY['The Nixon Doctrine','The Carter Doctrine','The Reagan Doctrine','The Bush Doctrine'],
 'The Reagan Doctrine', 'US History', 6),

('Who was the co-founder of the Black Panther Party in Oakland in 1966?',
 ARRAY['Stokely Carmichael','Malcolm X','Eldridge Cleaver','Huey Newton'],
 'Huey Newton', 'US History', 6),

('Which 1798 laws, passed during the Adams administration, restricted immigration and free speech?',
 ARRAY['The Sedition Acts','The Naturalization Acts','The Alien and Sedition Acts','The Espionage Acts'],
 'The Alien and Sedition Acts', 'US History', 6),

('What was the name of the US space program that placed the first American in orbit around Earth?',
 ARRAY['Project Mercury','Project Gemini','Project Apollo','Project Vanguard'],
 'Project Mercury', 'US History', 6),

('Which Supreme Court case in 1896 established the "separate but equal" doctrine?',
 ARRAY['Dred Scott v. Sandford','Plessy v. Ferguson','Korematsu v. United States','Lochner v. New York'],
 'Plessy v. Ferguson', 'US History', 6),

('Which US President is associated with the phrase "Speak softly and carry a big stick"?',
 ARRAY['William Howard Taft','Woodrow Wilson','William McKinley','Theodore Roosevelt'],
 'Theodore Roosevelt', 'US History', 6),

('What was the formal name of the post-WWII US aid program to rebuild Western Europe?',
 ARRAY['The Lend-Lease Plan','The European Recovery Program','The Atlantic Charter','The Bretton Woods Agreement'],
 'The European Recovery Program', 'US History', 6),

('Who was the first woman to serve as Secretary of State of the United States?',
 ARRAY['Hillary Clinton','Condoleezza Rice','Janet Reno','Madeleine Albright'],
 'Madeleine Albright', 'US History', 6),

('Which 1830s political party emerged in opposition to Andrew Jackson and his Democratic Party?',
 ARRAY['The Federalist Party','The National Republican Party','The Whig Party','The Free Soil Party'],
 'The Whig Party', 'US History', 6),

('What was the name of the 1968 report that blamed white racism for the riots that swept US cities in the mid-1960s?',
 ARRAY['The Warren Commission Report','The Kerner Commission Report','The Church Committee Report','The McCone Commission Report'],
 'The Kerner Commission Report', 'US History', 6),

('Which battle in October 1781 effectively ended the American Revolutionary War?',
 ARRAY['Battle of Saratoga','Battle of Bunker Hill','Battle of Trenton','Battle of Yorktown'],
 'Battle of Yorktown', 'US History', 6),

('Who was the first African American woman to win a Grand Slam tennis title, breaking racial barriers in the sport?',
 ARRAY['Arthur Ashe','Althea Gibson','James Blake','Zina Garrison'],
 'Althea Gibson', 'US History', 6);

INSERT INTO public.questions (text, options, correct_answer, category, difficulty) VALUES
('Which clause in the 14th Amendment has been used most broadly to protect individual rights against state action?',
 ARRAY['The Privileges and Immunities Clause','The Due Process Clause','The Equal Protection Clause','The Citizenship Clause'],
 'The Equal Protection Clause', 'US History', 7),

('Who was the US diplomat who developed the "Long Telegram" outlining the need to contain Soviet expansion?',
 ARRAY['Dean Acheson','John Foster Dulles','George Kennan','Paul Nitze'],
 'George Kennan', 'US History', 7),

('What was the name of the 1887 law that broke up Native American tribal lands into individual allotments?',
 ARRAY['The Indian Removal Act','The Dawes Severalty Act','The Indian Reorganization Act','The Land in Severalty Act'],
 'The Dawes Severalty Act', 'US History', 7),

('Which newspaper publishers were most associated with "yellow journalism" that helped incite the Spanish-American War?',
 ARRAY['Joseph Pulitzer and William Randolph Hearst','Horace Greeley and Charles Dana','Adolph Ochs and E.W. Scripps','Benjamin Day and James Gordon Bennett'],
 'Joseph Pulitzer and William Randolph Hearst', 'US History', 7),

('What was the name of the US Senate committee that investigated CIA and FBI illegal domestic surveillance programs in the 1970s?',
 ARRAY['The Ervin Committee','The Church Committee','The Pike Committee','The Rockefeller Commission'],
 'The Church Committee', 'US History', 7),

('Which constitutional doctrine, articulated by James Madison in the Virginia Resolutions, claimed states could nullify federal laws?',
 ARRAY['Nullification','Interposition','States'' Rights','Compact Theory'],
 'Interposition', 'US History', 7),

('Who was the Shoshone woman who served as a guide and interpreter for the Lewis and Clark Expedition?',
 ARRAY['Pocahontas','Winona','Sacagawea','Running Bird'],
 'Sacagawea', 'US History', 7),

('Which 1947 congressional act restricted union activities and was passed over Truman''s veto?',
 ARRAY['The Wagner Act','The Clayton Act','The Taft-Hartley Act','The National Labor Relations Act'],
 'The Taft-Hartley Act', 'US History', 7),

('What was the Zimmermann Telegram, which helped bring the US into WWI?',
 ARRAY['A German message proposing a Mexican-German alliance against the US, intercepted by Britain','A British ultimatum to Germany','A US warning to Germany about submarine warfare','A message from Austria-Hungary requesting German aid'],
 'A German message proposing a Mexican-German alliance against the US, intercepted by Britain', 'US History', 7),

('Which organization, founded in 1909, became the leading civil rights organization fighting racial discrimination?',
 ARRAY['The Urban League','The Congress of Racial Equality','The NAACP','The Southern Christian Leadership Conference'],
 'The NAACP', 'US History', 7),

('What was the name of the secret Manhattan Project site where the first atomic bomb was tested in July 1945?',
 ARRAY['Los Alamos','Oak Ridge','Trinity Site','Hanford Site'],
 'Trinity Site', 'US History', 7),

('Which President established the spoils system, replacing federal workers with political appointees?',
 ARRAY['John Quincy Adams','Martin Van Buren','James K. Polk','Andrew Jackson'],
 'Andrew Jackson', 'US History', 7),

('Which Civil War battle in September 1862, the bloodiest single day in American military history, stopped the Confederate invasion of the North?',
 ARRAY['Battle of Gettysburg','Battle of Shiloh','Battle of Antietam','Battle of Fredericksburg'],
 'Battle of Antietam', 'US History', 7),

('Who was the US diplomat who negotiated the purchase of Alaska, nicknamed "Seward''s Folly"?',
 ARRAY['Charles Sumner','Elihu Washburne','Hamilton Fish','William H. Seward'],
 'William H. Seward', 'US History', 7),

('What was the name of the controversial Supreme Court case that ruled Congress could not prohibit slavery in territories?',
 ARRAY['Missouri v. Holland','Scott v. Sandford','Prigg v. Pennsylvania','Ableman v. Booth'],
 'Scott v. Sandford', 'US History', 7),

('Which 1919 Supreme Court case established the "clear and present danger" test for free speech?',
 ARRAY['Gitlow v. New York','Debs v. United States','Abrams v. United States','Schenck v. United States'],
 'Schenck v. United States', 'US History', 7),

('What was the name of the 1944 Allied conference that established the post-war international monetary system?',
 ARRAY['The Yalta Conference','The Potsdam Conference','The Bretton Woods Conference','The Dumbarton Oaks Conference'],
 'The Bretton Woods Conference', 'US History', 7),

('Which 1917 law made it a federal crime to interfere with the military draft or make false statements about the war?',
 ARRAY['The Sedition Act of 1918','The Selective Service Act','The Espionage Act of 1917','The Defense of the Nation Act'],
 'The Espionage Act of 1917', 'US History', 7),

('What was the name of the 1924 immigration law that established national-origin quotas severely restricting immigration?',
 ARRAY['The Emergency Quota Act','The Immigration Act of 1924','The National Origins Act','The Reed-Johnson Act'],
 'The Immigration Act of 1924', 'US History', 7),

('Which Republican President''s administration was rocked by the Teapot Dome scandal involving oil leases?',
 ARRAY['William Howard Taft','Woodrow Wilson','Warren G. Harding','Calvin Coolidge'],
 'Warren G. Harding', 'US History', 7);

INSERT INTO public.questions (text, options, correct_answer, category, difficulty) VALUES
('What was the name of the first permanent representative government in colonial America, established in Virginia in 1619?',
 ARRAY['The Mayflower Compact','The House of Burgesses','The Virginia Council','The General Court'],
 'The House of Burgesses', 'US History', 8),

('Which 1964 congressional resolution gave President Johnson broad authority to escalate US involvement in Vietnam?',
 ARRAY['The SEATO Agreement','The Gulf of Tonkin Resolution','The National Security Directive 288','The Vietnam Authorization Act'],
 'The Gulf of Tonkin Resolution', 'US History', 8),

('What was the name of the secret government study commissioned by Robert McNamara that revealed the true history of US involvement in Vietnam?',
 ARRAY['The Fulbright Report','The Pentagon Papers','The Ellsberg Documents','The McNamara Papers'],
 'The Pentagon Papers', 'US History', 8),

('Which New Deal banking reform established federal deposit insurance, still in use today?',
 ARRAY['The Federal Reserve Act','The Banking Act of 1933 (Glass-Steagall Act)','The Securities Exchange Act','The National Banking Act'],
 'The Banking Act of 1933 (Glass-Steagall Act)', 'US History', 8),

('Who is known as the "Father of the Constitution," primarily responsible for drafting the document?',
 ARRAY['George Washington','Alexander Hamilton','Benjamin Franklin','James Madison'],
 'James Madison', 'US History', 8),

('Which battle in October 1777 is often considered the turning point of the Revolutionary War, convincing France to ally with America?',
 ARRAY['Battle of Brandywine','Battle of Trenton','Battle of Saratoga','Battle of Bunker Hill'],
 'Battle of Saratoga', 'US History', 8),

('What was the name of the political crisis during John Adams'' presidency involving French demands for bribes from US diplomats?',
 ARRAY['The Citizen Genêt Affair','The Jay Treaty Controversy','The XYZ Affair','The Quasi-War Crisis'],
 'The XYZ Affair', 'US History', 8),

('Which Supreme Court case in 1819 established that states could not tax federal institutions?',
 ARRAY['Dartmouth College v. Woodward','Gibbons v. Ogden','McCulloch v. Maryland','Fletcher v. Peck'],
 'McCulloch v. Maryland', 'US History', 8),

('Who was the first US President to be impeached by the House of Representatives?',
 ARRAY['Richard Nixon','Bill Clinton','Andrew Johnson','James Buchanan'],
 'Andrew Johnson', 'US History', 8),

('Which agreement, negotiated in 1978 by President Carter, led to the Egypt-Israel Peace Treaty?',
 ARRAY['The Oslo Accords','The Camp David Accords','The Sinai Interim Agreement','The Geneva Peace Agreement'],
 'The Camp David Accords', 'US History', 8),

('What was the name of the influential political faction in the early republic that favored a strong federal government and commercial economy?',
 ARRAY['Democratic-Republicans','Anti-Federalists','Federalists','Whigs'],
 'Federalists', 'US History', 8),

('Which act, passed in 1906 after Upton Sinclair''s exposé, reformed the meatpacking industry?',
 ARRAY['The Pure Food and Drug Act','The Federal Meat Inspection Act','The Food Safety Act','The Meat Processing Reform Act'],
 'The Federal Meat Inspection Act', 'US History', 8),

('Who was the Secretary of State under Nixon who negotiated the end of US involvement in Vietnam?',
 ARRAY['Dean Rusk','William Rogers','Zbigniew Brzezinski','Henry Kissinger'],
 'Henry Kissinger', 'US History', 8),

('Which abolitionist and escaped slave published an autobiographical narrative that became a powerful anti-slavery text?',
 ARRAY['Harriet Tubman','Sojourner Truth','Frederick Douglass','Nat Turner'],
 'Frederick Douglass', 'US History', 8),

('What was the name of the 1935 New Deal law that established labor''s right to organize and bargain collectively?',
 ARRAY['The Clayton Antitrust Act','The National Labor Relations Act','The Fair Labor Standards Act','The Walsh-Healey Act'],
 'The National Labor Relations Act', 'US History', 8),

('Which event in 1969 is often credited as the start of the modern LGBTQ+ rights movement?',
 ARRAY['The Harvey Milk Election','The Stonewall Riots','The San Francisco Gay Pride March','The Kinsey Report Publication'],
 'The Stonewall Riots', 'US History', 8),

('What was the name of the US policy of supplying arms and material to Britain before entering WWII?',
 ARRAY['The Cash and Carry Policy','The Atlantic Charter','The Lend-Lease Act','The Neutrality Acts'],
 'The Lend-Lease Act', 'US History', 8),

('Which 1944 conference among Allied leaders laid the groundwork for the post-war international order and the United Nations?',
 ARRAY['The Potsdam Conference','The Tehran Conference','The Casablanca Conference','The Dumbarton Oaks Conference'],
 'The Dumbarton Oaks Conference', 'US History', 8),

('Which series of debates in 1858 brought Abraham Lincoln to national prominence?',
 ARRAY['The Republican National Debates','The Illinois Senate Debates','The Lincoln-Douglas Debates','The Freeport Debates'],
 'The Lincoln-Douglas Debates', 'US History', 8),

('Which political party emerged in the 1850s specifically to oppose the expansion of slavery into new territories?',
 ARRAY['The Free Soil Party','The Know-Nothing Party','The Republican Party','The Liberty Party'],
 'The Republican Party', 'US History', 8);

INSERT INTO public.questions (text, options, correct_answer, category, difficulty) VALUES
('Which 1793 Supreme Court case, later overturned by the 11th Amendment, ruled that citizens of one state could sue another state in federal court?',
 ARRAY['Hylton v. United States','Ware v. Hylton','Chisholm v. Georgia','Calder v. Bull'],
 'Chisholm v. Georgia', 'US History', 9),

('What was the name of the radical abolitionist who led the 1859 raid on Harper''s Ferry to start a slave rebellion?',
 ARRAY['Nat Turner','Denmark Vesey','William Lloyd Garrison','John Brown'],
 'John Brown', 'US History', 9),

('Which secret government domestic surveillance program monitored civil rights leaders and anti-war activists from the 1950s through the 1970s?',
 ARRAY['Operation CHAOS','COINTELPRO','HTLINGUAL','Operation MOCKINGBIRD'],
 'COINTELPRO', 'US History', 9),

('Who was the powerful Republican "Stalwart" political boss whose influence was broken by President Garfield''s refusal to grant patronage appointments?',
 ARRAY['James G. Blaine','Roscoe Conkling','Thomas Platt','Mark Hanna'],
 'Roscoe Conkling', 'US History', 9),

('Which 1986 law granted amnesty to nearly 3 million undocumented immigrants while imposing employer sanctions?',
 ARRAY['The Immigration Reform Act','The Simpson-Mazzoli Act','The Immigration Control and Reform Act','The Border Security Act'],
 'The Simpson-Mazzoli Act', 'US History', 9),

('What was the name of the failed 1864 Radical Republican bill that would have imposed harsher Reconstruction requirements on the South than Lincoln''s plan?',
 ARRAY['The Thaddeus Stevens Plan','The Radical Reconstruction Bill','The Wade-Davis Bill','The Joint Committee Plan'],
 'The Wade-Davis Bill', 'US History', 9),

('What was the name of the 1978 Supreme Court case that upheld affirmative action in university admissions while banning rigid quota systems?',
 ARRAY['Grutter v. Bollinger','Bakke v. University of California','Regents of the University of California v. Bakke','Fisher v. University of Texas'],
 'Regents of the University of California v. Bakke', 'US History', 9),

('Who was the pioneering American feminist who co-founded the National Woman Suffrage Association and authored the "Declaration of Sentiments"?',
 ARRAY['Susan B. Anthony','Sojourner Truth','Lucy Stone','Elizabeth Cady Stanton'],
 'Elizabeth Cady Stanton', 'US History', 9),

('Which constitutional crisis of 1937 involved FDR''s attempt to add justices to the Supreme Court to overcome opposition to New Deal legislation?',
 ARRAY['The Four Horsemen Crisis','The Supreme Court Packing Plan','The Nine Old Men Controversy','The Judicial Reform Crisis'],
 'The Supreme Court Packing Plan', 'US History', 9),

('Who was the first US Secretary of the Treasury, responsible for establishing the national financial system including the national bank?',
 ARRAY['Robert Morris','Thomas Jefferson','Albert Gallatin','Alexander Hamilton'],
 'Alexander Hamilton', 'US History', 9),

('Which 1883 law reformed the federal civil service by requiring competitive examinations for government positions?',
 ARRAY['The Hatch Act','The Pendleton Civil Service Reform Act','The Civil Service Act of 1871','The Merit System Act'],
 'The Pendleton Civil Service Reform Act', 'US History', 9),

('Which 1905 peace treaty, negotiated by Theodore Roosevelt, ended the Russo-Japanese War and won him the Nobel Peace Prize?',
 ARRAY['The Treaty of Portsmouth','The Treaty of Algeciras','The Treaty of Peking','The Treaty of Tsushima'],
 'The Treaty of Portsmouth', 'US History', 9),

('Which Reconstruction-era secret society used terror and violence to suppress Black political participation in the South?',
 ARRAY['The White League','The Knights of the White Camellia','The Red Shirts','The Ku Klux Klan'],
 'The Ku Klux Klan', 'US History', 9),

('What was the name of the US Army''s 1890 campaign against the Lakota Sioux that culminated in the Wounded Knee Massacre?',
 ARRAY['The Sioux Wars','The Ghost Dance Campaign','The Pine Ridge Campaign','The Dakota Conflict'],
 'The Ghost Dance Campaign', 'US History', 9),

('What was the name of the 1919–1920 series of raids ordered by Attorney General Mitchell Palmer targeting suspected radical and communist organizations?',
 ARRAY['The Red Raids','The Palmer Raids','The Espionage Sweeps','The Anarchist Deportations'],
 'The Palmer Raids', 'US History', 9),

('Which 1963 Supreme Court ruling required states to provide attorneys to defendants who could not afford them in criminal cases?',
 ARRAY['Miranda v. Arizona','Mapp v. Ohio','Gideon v. Wainwright','Escobedo v. Illinois'],
 'Gideon v. Wainwright', 'US History', 9),

('What term described the post-Civil War period when federal troops occupied the South and enforced new constitutional amendments?',
 ARRAY['The Redemption Era','Radical Reconstruction','Military Occupation','The Carpetbagger Era'],
 'Radical Reconstruction', 'US History', 9),

('Which 1890 federal law, the first major antitrust legislation in US history, outlawed monopolistic business combinations?',
 ARRAY['The Interstate Commerce Act','The Clayton Antitrust Act','The Sherman Antitrust Act','The Federal Trade Commission Act'],
 'The Sherman Antitrust Act', 'US History', 9),

('Who was the Progressive Era journalist whose photographs documented poverty in New York City tenements, shocking the public?',
 ARRAY['Upton Sinclair','Lincoln Steffens','Ida Tarbell','Jacob Riis'],
 'Jacob Riis', 'US History', 9),

('Which failed 1961 CIA-backed invasion of Cuba proved an embarrassment for the Kennedy administration?',
 ARRAY['Operation Mongoose','The Bay of Pigs Invasion','Operation Zapata','The Cuba Project'],
 'The Bay of Pigs Invasion', 'US History', 9);


-- ============================================================
-- AMERICAN CULTURE + US SPORTS + FAMOUS AMERICANS (additional questions)
-- ============================================================

INSERT INTO public.questions (text, options, correct_answer, category, difficulty) VALUES
('What is the name of the American holiday celebrated on the fourth Thursday of November?', ARRAY['Christmas','Thanksgiving','Labor Day','Independence Day'], 'Thanksgiving', 'American Culture', 1),
('Which city is known as the "Windy City"?', ARRAY['New York','Chicago','Dallas','Denver'], 'Chicago', 'American Culture', 1),
('What colors make up the American flag?', ARRAY['Red, White, and Blue','Red, White, and Green','Blue, White, and Gold','Red, Blue, and Yellow'], 'Red, White, and Blue', 'American Culture', 1),
('What is the most popular fast food chain in the United States?', ARRAY['Burger King','Wendy''s','McDonald''s','Subway'], 'McDonald''s', 'American Culture', 1),
('Which holiday is celebrated on October 31st in America?', ARRAY['Easter','Halloween','Mardi Gras','Cinco de Mayo'], 'Halloween', 'American Culture', 1),
('What is the national bird of the United States?', ARRAY['Bald Eagle','Turkey','Great Horned Owl','Blue Jay'], 'Bald Eagle', 'American Culture', 1),
('In which month does the United States celebrate Independence Day?', ARRAY['May','June','July','August'], 'July', 'American Culture', 1),
('What is the name of the famous music festival held annually in New Orleans?', ARRAY['Coachella','Bonnaroo','Mardi Gras','Jazz Fest'], 'Jazz Fest', 'American Culture', 1),
('Which American city is known as "Music City USA"?', ARRAY['Austin','Nashville','Memphis','Atlanta'], 'Nashville', 'American Culture', 1),
('What dance became popular in America during the 1920s and is associated with the flapper era?', ARRAY['Foxtrot','Charleston','Tango','Waltz'], 'Charleston', 'American Culture', 1),
('What is the name of the American tradition where families gather to watch fireworks on July 4th?', ARRAY['Memorial Day','Flag Day','Independence Day','Veterans Day'], 'Independence Day', 'American Culture', 1),
('Which American city is home to Hollywood?', ARRAY['San Francisco','Las Vegas','Los Angeles','Miami'], 'Los Angeles', 'American Culture', 1),
('What is the name of the famous annual New York City parade held on Thanksgiving Day?', ARRAY['Rose Parade','Macy''s Thanksgiving Day Parade','St. Patrick''s Day Parade','Tournament of Roses'], 'Macy''s Thanksgiving Day Parade', 'American Culture', 1),
('Which genre of music originated in the American South and features steel guitars and fiddles?', ARRAY['Blues','Jazz','Country','R&B'], 'Country', 'American Culture', 1),
('What is America''s most popular Thanksgiving side dish, made from potatoes?', ARRAY['French fries','Mashed potatoes','Potato salad','Hash browns'], 'Mashed potatoes', 'American Culture', 1),
('What famous American landmark is located in New York Harbor?', ARRAY['Mount Rushmore','Statue of Liberty','Golden Gate Bridge','Lincoln Memorial'], 'Statue of Liberty', 'American Culture', 1),
('Which American holiday honors military veterans on November 11th?', ARRAY['Memorial Day','Labor Day','Veterans Day','Flag Day'], 'Veterans Day', 'American Culture', 1),
('What is the name of the style of music that combines blues and gospel and originated in African American communities?', ARRAY['Country','Folk','R&B','Bluegrass'], 'R&B', 'American Culture', 1),
('Which American city is famous for its deep-dish pizza?', ARRAY['New York','Chicago','Detroit','Philadelphia'], 'Chicago', 'American Culture', 1),
('What is the name of the famous San Francisco bridge painted bright orange-red?', ARRAY['Brooklyn Bridge','Golden Gate Bridge','Bay Bridge','Mackinac Bridge'], 'Golden Gate Bridge', 'American Culture', 1),
('Which American state is known as the "Lone Star State"?', ARRAY['Florida','California','Texas','Nevada'], 'Texas', 'American Culture', 1),
('What is the name of the popular American dance that emerged in the 1950s alongside rock and roll?', ARRAY['Lindy Hop','Jive','Twist','Swing'], 'Twist', 'American Culture', 2),
('Which American music genre is known for its storytelling lyrics and acoustic instruments, popularized by artists like Pete Seeger?', ARRAY['Blues','Folk','Country','Jazz'], 'Folk', 'American Culture', 2),
('What is the name of the American holiday that celebrates workers on the first Monday of September?', ARRAY['Memorial Day','Labor Day','Veterans Day','Presidents Day'], 'Labor Day', 'American Culture', 2),
('Which city is considered the birthplace of country music and home to the Grand Ole Opry?', ARRAY['Austin','Memphis','Nashville','Charlotte'], 'Nashville', 'American Culture', 2),
('What popular American food is associated with the Fourth of July and typically grilled outdoors?', ARRAY['Hot dogs','Tacos','Sushi','Pizza'], 'Hot dogs', 'American Culture', 2),
('Which American art movement of the 1950s and 1960s featured soup cans and celebrities as subjects?', ARRAY['Surrealism','Abstract Expressionism','Pop Art','Cubism'], 'Pop Art', 'American Culture', 2),
('What is the name of the famous American literary award given to the best novel each year?', ARRAY['Tony Award','Grammy Award','National Book Award','Edgar Award'], 'National Book Award', 'American Culture', 2),
('Which decade is known as the "Golden Age of Television" in America?', ARRAY['1940s','1950s','1960s','1970s'], '1950s', 'American Culture', 2),
('What American city is famous for its Bourbon Street and French Quarter?', ARRAY['Savannah','New Orleans','Charleston','Miami'], 'New Orleans', 'American Culture', 2),
('Which American fashion designer is known for creating the Polo Ralph Lauren brand?', ARRAY['Calvin Klein','Tommy Hilfiger','Ralph Lauren','Giorgio Armani'], 'Ralph Lauren', 'American Culture', 2),
('What is the name of the American music genre that blends jazz, blues, and African rhythms, pioneered in cities like Detroit and Chicago?', ARRAY['Soul','Hip-hop','Country','Folk'], 'Soul', 'American Culture', 2),
('Which famous American architect designed the Guggenheim Museum in New York City?', ARRAY['I.M. Pei','Frank Lloyd Wright','Ludwig Mies van der Rohe','Philip Johnson'], 'Frank Lloyd Wright', 'American Culture', 2),
('What is the name of the annual film festival held in Park City, Utah, that showcases independent films?', ARRAY['Cannes','Tribeca','Sundance','SXSW'], 'Sundance', 'American Culture', 2),
('Which American city hosts the famous annual Mardi Gras celebration?', ARRAY['Miami','Atlanta','New Orleans','Houston'], 'New Orleans', 'American Culture', 2),
('What style of American architecture characterized by open floor plans and integration with nature was pioneered by Frank Lloyd Wright?', ARRAY['Brutalism','Prairie Style','Art Deco','Bauhaus'], 'Prairie Style', 'American Culture', 2),
('Which American city is known as the "City of Brotherly Love"?', ARRAY['Boston','Philadelphia','Baltimore','Pittsburgh'], 'Philadelphia', 'American Culture', 2),
('What is the name of the traditional American folk dance performed at barn dances?', ARRAY['Waltz','Square dance','Polka','Flamenco'], 'Square dance', 'American Culture', 2),
('Which American city is famous for its annual South by Southwest (SXSW) festival?', ARRAY['Nashville','Austin','Los Angeles','Seattle'], 'Austin', 'American Culture', 2),
('What popular American TV show from the 1990s featured six friends living in New York City?', ARRAY['Seinfeld','Will & Grace','Cheers','Friends'], 'Friends', 'American Culture', 2),
('Which American holiday is celebrated with heart-shaped decorations and chocolates on February 14th?', ARRAY['Mother''s Day','Easter','Valentine''s Day','Groundhog Day'], 'Valentine''s Day', 'American Culture', 2),
('What American music genre is characterized by call-and-response patterns and twelve-bar chord progressions?', ARRAY['Country','Jazz','Blues','Folk'], 'Blues', 'American Culture', 2),
('Which famous American children''s author wrote "Green Eggs and Ham" and "The Cat in the Hat"?', ARRAY['Maurice Sendak','Roald Dahl','Dr. Seuss','Shel Silverstein'], 'Dr. Seuss', 'American Culture', 2),
('What is the name of the iconic American diner dish consisting of stacked pancakes served with maple syrup?', ARRAY['Waffles','French toast','Pancakes','Crepes'], 'Pancakes', 'American Culture', 2),
('Which American art movement celebrated everyday consumerism and mass production in the 1960s?', ARRAY['Abstract Expressionism','Minimalism','Pop Art','Surrealism'], 'Pop Art', 'American Culture', 3),
('What is the name of the famous literary magazine founded in New York in 1925 that publishes fiction, poetry, and criticism?', ARRAY['The Atlantic','Harper''s Magazine','The New Yorker','Rolling Stone'], 'The New Yorker', 'American Culture', 3),
('Which American region is known for its Cajun and Creole culinary traditions?', ARRAY['New England','The Southwest','The Pacific Northwest','The Gulf Coast'], 'The Gulf Coast', 'American Culture', 3),
('What is the name of the movement in American literature from the late 1940s to the 1950s that rejected mainstream values, associated with Jack Kerouac?', ARRAY['Transcendentalism','The Beat Generation','The Harlem Renaissance','Modernism'], 'The Beat Generation', 'American Culture', 3),
('Which famous American architect designed the Vietnam Veterans Memorial in Washington, D.C.?', ARRAY['Maya Lin','I.M. Pei','Richard Meier','Renzo Piano'], 'Maya Lin', 'American Culture', 3),
('What is the name of the African American cultural and artistic movement that flourished in New York City during the 1920s?', ARRAY['The Harlem Renaissance','The Civil Rights Movement','The Black Arts Movement','The Great Migration'], 'The Harlem Renaissance', 'American Culture', 3),
('Which American fashion designer is credited with creating the little black dress as an American fashion staple?', ARRAY['Coco Chanel','Donna Karan','Calvin Klein','Halston'], 'Halston', 'American Culture', 3),
('What is the term for the style of American folk music associated with the Appalachian region, featuring banjo and mandolin?', ARRAY['Bluegrass','Country','Cajun','Zydeco'], 'Bluegrass', 'American Culture', 3),
('Which American film director is known for classics like "Citizen Kane" and is considered one of the greatest filmmakers of all time?', ARRAY['Alfred Hitchcock','John Ford','Orson Welles','Howard Hawks'], 'Orson Welles', 'American Culture', 3),
('What is the name of the annual gathering in Black Rock City, Nevada, that celebrates art, self-expression, and community?', ARRAY['Coachella','Burning Man','Lollapalooza','Bonnaroo'], 'Burning Man', 'American Culture', 3),
('Which American city is known for its thriving street art scene and the Wynwood Walls gallery?', ARRAY['Brooklyn','Detroit','Miami','Portland'], 'Miami', 'American Culture', 3),
('What is the name of the avant-garde art movement associated with Marcel Duchamp and Man Ray that influenced American art in the early 20th century?', ARRAY['Cubism','Dadaism','Surrealism','Futurism'], 'Dadaism', 'American Culture', 3),
('Which American novelist wrote "Beloved," a Pulitzer Prize-winning novel about slavery?', ARRAY['Alice Walker','Toni Morrison','Maya Angelou','Zora Neale Hurston'], 'Toni Morrison', 'American Culture', 3),
('What is the name of the popular American dance style that emerged in the 1970s disco era?', ARRAY['Hustle','Moonwalk','Running Man','Electric Slide'], 'Hustle', 'American Culture', 3),
('Which American city is known as the "Emerald City" and is associated with grunge music?', ARRAY['Portland','Seattle','Denver','Minneapolis'], 'Seattle', 'American Culture', 3),
('What is the name of the American literary movement of the 19th century associated with writers like Ralph Waldo Emerson and Henry David Thoreau?', ARRAY['Realism','Transcendentalism','Naturalism','Romanticism'], 'Transcendentalism', 'American Culture', 3),
('Which famous American fashion designer is known for creating the wrap dress in the 1970s?', ARRAY['Diane von Furstenberg','Gloria Vanderbilt','Vera Wang','Donna Karan'], 'Diane von Furstenberg', 'American Culture', 3),
('What is the name of the architectural style associated with skyscrapers built in cities like New York and Chicago during the 1920s and 1930s?', ARRAY['Brutalism','Beaux-Arts','Art Deco','International Style'], 'Art Deco', 'American Culture', 3),
('Which American painter is known for his depictions of rural American life, including "American Gothic"?', ARRAY['Edward Hopper','Norman Rockwell','Grant Wood','Andrew Wyeth'], 'Grant Wood', 'American Culture', 3),
('What is the name of the hip-hop dance style that originated in the Bronx, New York, in the 1970s?', ARRAY['Popping','Breaking (breakdancing)','Locking','Krumping'], 'Breaking (breakdancing)', 'American Culture', 3),
('Which American TV network first broadcast in color in the 1950s, revolutionizing home entertainment?', ARRAY['ABC','CBS','NBC','FOX'], 'NBC', 'American Culture', 3),
('What is the name of the famous painting by American artist Edward Hopper that depicts late-night diner patrons?', ARRAY['American Gothic','Nighthawks','Christina''s World','Freedom from Want'], 'Nighthawks', 'American Culture', 4),
('Which American music genre originated in African American communities in the 1970s in New York City and combines DJing, MCing, breakdancing, and graffiti?', ARRAY['Funk','Disco','Hip-hop','Soul'], 'Hip-hop', 'American Culture', 4),
('What is the name of the annual televised awards ceremony that honors achievements in the music industry?', ARRAY['Emmy Awards','Tony Awards','Grammy Awards','Academy Awards'], 'Grammy Awards', 'American Culture', 4),
('Which American author wrote the dystopian novel "Brave New World"?', ARRAY['George Orwell','Aldous Huxley','Ray Bradbury','Kurt Vonnegut'], 'Aldous Huxley', 'American Culture', 4),
('What is the name of the iconic American roadway stretching from Chicago to Santa Monica, known as the "Mother Road"?', ARRAY['Pacific Coast Highway','Route 66','Lincoln Highway','Dixie Highway'], 'Route 66', 'American Culture', 4),
('Which American city hosts the annual Coachella Valley Music and Arts Festival?', ARRAY['Palm Springs','Indio','Los Angeles','San Diego'], 'Indio', 'American Culture', 4),
('What is the name of the famous American poem by Walt Whitman that celebrates American democracy and the human body?', ARRAY['The Raven','Song of Myself','The Waste Land','O Captain! My Captain!'], 'Song of Myself', 'American Culture', 4),
('Which American city is known as the birthplace of hip-hop?', ARRAY['Brooklyn','Harlem','The Bronx','Queens'], 'The Bronx', 'American Culture', 4),
('What is the name of the American art movement of the 1950s that emphasized spontaneous, automatic, or subconscious creation?', ARRAY['Pop Art','Minimalism','Abstract Expressionism','Op Art'], 'Abstract Expressionism', 'American Culture', 5),
('Which famous American artist is known for the Campbell''s Soup Cans painting?', ARRAY['Roy Lichtenstein','Jasper Johns','Andy Warhol','Robert Rauschenberg'], 'Andy Warhol', 'American Culture', 5),
('What is the name of the subgenre of country music that combines rock and roll influences, associated with artists like Johnny Cash?', ARRAY['Outlaw country','Rockabilly','Bluegrass','Honky-tonk'], 'Rockabilly', 'American Culture', 5),
('Which American architect designed the iconic TWA Flight Center at JFK Airport, inspired by bird wings?', ARRAY['Frank Lloyd Wright','Eero Saarinen','Louis Kahn','Philip Johnson'], 'Eero Saarinen', 'American Culture', 5),
('What is the name of the literary technique used by William Faulkner in "The Sound and the Fury" that presents multiple perspectives?', ARRAY['Magical realism','Stream of consciousness','Unreliable narrator','Epistolary'], 'Stream of consciousness', 'American Culture', 5),
('Which American fashion designer popularized the "American sportswear" look in the 1930s and 1940s?', ARRAY['Claire McCardell','Mainbocher','Adrian','Hattie Carnegie'], 'Claire McCardell', 'American Culture', 6),
('What is the name of the musical theater tradition that began in New York City in the late 19th century and features vaudeville acts?', ARRAY['Opera','Vaudeville','Burlesque','Minstrelsy'], 'Vaudeville', 'American Culture', 6),
('Which American city is considered the heart of the "Rust Belt" and was historically associated with steel production?', ARRAY['Cleveland','Pittsburgh','Detroit','Buffalo'], 'Pittsburgh', 'American Culture', 6),
('What is the name of the American literary journal founded in 1912 that published early Modernist poetry by T.S. Eliot and Ezra Pound?', ARRAY['Poetry Magazine','The Little Review','The Dial','Partisan Review'], 'Poetry Magazine', 'American Culture', 6),
('Which American graphic novel is considered a landmark in comics history and deals with the Holocaust through animal metaphors?', ARRAY['Watchmen','Persepolis','Maus','Fun Home'], 'Maus', 'American Culture', 7),
('What is the name of the postmodern American novel by Thomas Pynchon that follows a woman investigating a mysterious mail service?', ARRAY['Gravity''s Rainbow','White Noise','The Crying of Lot 49','Infinite Jest'], 'The Crying of Lot 49', 'American Culture', 7),
('Which American filmmaker pioneered the use of jump cuts and montage in films like "Breathless" and influenced the New Hollywood movement?', ARRAY['Francois Truffaut','Jean-Luc Godard','Arthur Penn','Dennis Hopper'], 'Jean-Luc Godard', 'American Culture', 7),
('What is the name of the Chicago architectural firm that designed the iconic Willis Tower (formerly Sears Tower)?', ARRAY['Skidmore, Owings & Merrill','HOK','Gensler','Perkins and Will'], 'Skidmore, Owings & Merrill', 'American Culture', 7),
('Which American poet is known for the Cantos, an epic poem spanning decades that blends mythology and economics?', ARRAY['T.S. Eliot','Wallace Stevens','Ezra Pound','William Carlos Williams'], 'Ezra Pound', 'American Culture', 7),
('What dance style, originating in African American communities in Harlem, became the defining dance of the swing era?', ARRAY['Charleston','Fox Trot','Lindy Hop','Jitterbug'], 'Lindy Hop', 'American Culture', 8),
('Which American art critic wrote the influential essay "Avant-Garde and Kitsch" in 1939?', ARRAY['Harold Rosenberg','Meyer Schapiro','Clement Greenberg','Leo Steinberg'], 'Clement Greenberg', 'American Culture', 8),
('What is the name of the American literary movement associated with John Steinbeck and Theodore Dreiser that depicted ordinary people struggling against social forces?', ARRAY['Realism','Naturalism','Modernism','Regionalism'], 'Naturalism', 'American Culture', 8),
('Which architect designed the Fallingwater house in Pennsylvania, considered one of the greatest American architectural achievements?', ARRAY['Louis Sullivan','Walter Gropius','Frank Lloyd Wright','Mies van der Rohe'], 'Frank Lloyd Wright', 'American Culture', 8),
('What is the name of the African American art movement of the 1960s and 1970s that sought to create art relevant to the Black community?', ARRAY['Harlem Renaissance','Black Arts Movement','Afrofuturism','Négritude'], 'Black Arts Movement', 'American Culture', 9),
('Which American author wrote "The Autobiography of an Ex-Colored Man," an early landmark of African American fiction?', ARRAY['Charles Chesnutt','W.E.B. Du Bois','James Weldon Johnson','Paul Laurence Dunbar'], 'James Weldon Johnson', 'American Culture', 9),
('What is the name of the avant-garde American composer who pioneered "prepared piano" and chance-based composition?', ARRAY['Philip Glass','Steve Reich','John Cage','La Monte Young'], 'John Cage', 'American Culture', 9),
('Which American city''s "Second City" comedy club launched the careers of John Belushi, Bill Murray, and Tina Fey?', ARRAY['New York','Los Angeles','Chicago','Toronto'], 'Chicago', 'American Culture', 9),
('What is the name of the influential American architecture critic who wrote "The Death and Life of Great American Cities"?', ARRAY['Ada Louise Huxtable','Lewis Mumford','Jane Jacobs','Paul Goldberger'], 'Jane Jacobs', 'American Culture', 9);

INSERT INTO public.questions (text, options, correct_answer, category, difficulty) VALUES
('How many players are on a baseball team''s field at one time?', ARRAY['7','8','9','10'], '9', 'US Sports', 1),
('In which sport do players use a puck instead of a ball?', ARRAY['Basketball','Soccer','Hockey','Lacrosse'], 'Hockey', 'US Sports', 1),
('What is the name of the trophy awarded to the winner of the NBA Finals?', ARRAY['Larry O''Brien Trophy','Lombardi Trophy','Commissioner''s Trophy','Stanley Cup'], 'Larry O''Brien Trophy', 'US Sports', 1),
('How many points is a touchdown worth in American football?', ARRAY['3','6','7','2'], '6', 'US Sports', 1),
('What is the name of the annual college football championship game?', ARRAY['Rose Bowl','Sugar Bowl','College Football Playoff National Championship','Orange Bowl'], 'College Football Playoff National Championship', 'US Sports', 1),
('Which American athlete won the most Olympic gold medals of all time?', ARRAY['Carl Lewis','Mark Spitz','Jesse Owens','Michael Phelps'], 'Michael Phelps', 'US Sports', 1),
('In basketball, how many points is a shot from beyond the three-point line worth?', ARRAY['1','2','3','4'], '3', 'US Sports', 1),
('What is the name of the governing body of American college sports?', ARRAY['NFL','NHL','NCAA','MLB'], 'NCAA', 'US Sports', 1),
('Which team has won the most World Series championships?', ARRAY['Los Angeles Dodgers','Boston Red Sox','San Francisco Giants','New York Yankees'], 'New York Yankees', 'US Sports', 1),
('In what sport is a "birdie" term used?', ARRAY['Tennis','Golf','Bowling','Baseball'], 'Golf', 'US Sports', 1),
('Which famous boxer was known as "The Greatest" and refused induction into the Vietnam War draft?', ARRAY['Joe Frazier','George Foreman','Muhammad Ali','Sonny Liston'], 'Muhammad Ali', 'US Sports', 1),
('How many yards must an American football team advance to earn a first down?', ARRAY['5','10','15','20'], '10', 'US Sports', 1),
('What sport is played at Wimbledon?', ARRAY['Cricket','Squash','Badminton','Tennis'], 'Tennis', 'US Sports', 1),
('Which American track and field athlete won four gold medals at the 1936 Berlin Olympics?', ARRAY['Jim Thorpe','Jesse Owens','Ralph Metcalfe','Eddie Tolan'], 'Jesse Owens', 'US Sports', 1),
('What is the name of the annual college basketball tournament held in March?', ARRAY['The Final Four','March Madness','Big Dance','NCAA Tournament'], 'March Madness', 'US Sports', 1),
('Which sport uses the terms "strike," "ball," and "home run"?', ARRAY['Cricket','Softball','Baseball','Kickball'], 'Baseball', 'US Sports', 1),
('What is the distance of a marathon in miles (approximately)?', ARRAY['20','24','26','30'], '26', 'US Sports', 1),
('Which city''s team is known as the Dallas Cowboys?', ARRAY['Dallas','Houston','San Antonio','Austin'], 'Dallas', 'US Sports', 1),
('In which sport do athletes compete in the Kentucky Derby?', ARRAY['Greyhound racing','Horse racing','Harness racing','Polo'], 'Horse racing', 'US Sports', 1),
('How many innings are in a standard baseball game?', ARRAY['7','8','9','10'], '9', 'US Sports', 1),
('What is the name of the trophy given to the Super Bowl champion?', ARRAY['Lombardi Trophy','Vince Lombardi Award','NFL Championship Trophy','Commissioner''s Trophy'], 'Lombardi Trophy', 'US Sports', 1),
('Which NBA team is nicknamed the "Lakers"?', ARRAY['Boston','Chicago','Los Angeles','Miami'], 'Los Angeles', 'US Sports', 1),
('What is the number of holes in a standard round of golf?', ARRAY['9','18','27','36'], '18', 'US Sports', 2),
('Which famous baseball player was known as the "Iron Horse" for playing in 2,130 consecutive games?', ARRAY['Babe Ruth','Lou Gehrig','Joe DiMaggio','Mickey Mantle'], 'Lou Gehrig', 'US Sports', 2),
('What is the name of the famous horse race that, along with the Preakness and Belmont Stakes, makes up the Triple Crown?', ARRAY['Breeders'' Cup','Kentucky Derby','Arlington Million','Travers Stakes'], 'Kentucky Derby', 'US Sports', 2),
('Which NFL team plays its home games at Lambeau Field in Green Bay, Wisconsin?', ARRAY['Chicago Bears','Minnesota Vikings','Green Bay Packers','Detroit Lions'], 'Green Bay Packers', 'US Sports', 2),
('Who holds the MLB record for most career home runs?', ARRAY['Babe Ruth','Barry Bonds','Hank Aaron','Willie Mays'], 'Barry Bonds', 'US Sports', 2),
('Which American boxer famously defeated George Foreman in the "Rumble in the Jungle" in 1974?', ARRAY['Joe Frazier','Muhammad Ali','Ken Norton','Larry Holmes'], 'Muhammad Ali', 'US Sports', 2),
('What is the name of the annual college football game played on New Year''s Day in Pasadena, California?', ARRAY['Orange Bowl','Sugar Bowl','Cotton Bowl','Rose Bowl'], 'Rose Bowl', 'US Sports', 2),
('Which NBA player is known as "The Mailman" and played for the Utah Jazz?', ARRAY['John Stockton','Karl Malone','David Robinson','Charles Barkley'], 'Karl Malone', 'US Sports', 2),
('What is the name of the prestigious golf tournament held annually in Augusta, Georgia?', ARRAY['The Open Championship','US Open','The Masters','PGA Championship'], 'The Masters', 'US Sports', 2),
('Which American speed skater won five gold medals at the 1980 Winter Olympics in Lake Placid?', ARRAY['Dan Jansen','Bonnie Blair','Eric Heiden','Apolo Ohno'], 'Eric Heiden', 'US Sports', 2),
('What is the maximum number of players on an NFL roster?', ARRAY['45','53','60','65'], '53', 'US Sports', 2),
('Which college football team is nicknamed the "Fighting Irish"?', ARRAY['Boston College','Fordham','Notre Dame','Georgetown'], 'Notre Dame', 'US Sports', 2),
('Which NASCAR driver is known as "The Intimidator" and won seven Winston Cup championships?', ARRAY['Richard Petty','Dale Earnhardt Sr.','Jeff Gordon','Cale Yarborough'], 'Dale Earnhardt Sr.', 'US Sports', 2),
('What is the name of the tennis tournament held each summer in Flushing, New York?', ARRAY['Wimbledon','French Open','Australian Open','US Open'], 'US Open', 'US Sports', 2),
('Which NBA team has won the most championships?', ARRAY['Los Angeles Lakers','Chicago Bulls','Golden State Warriors','Boston Celtics'], 'Boston Celtics', 'US Sports', 2),
('Which legendary baseball player was called the "Say Hey Kid"?', ARRAY['Hank Aaron','Willie Mays','Mickey Mantle','Roberto Clemente'], 'Willie Mays', 'US Sports', 2),
('What is the name of the American swimmer who won seven gold medals at the 1972 Munich Olympics?', ARRAY['Johnny Weissmuller','Mark Spitz','Gary Hall Jr.','Matt Biondi'], 'Mark Spitz', 'US Sports', 2),
('Which college football conference is known as the "SEC"?', ARRAY['South Eastern Conference','Southeastern Conference','Southern Elite Conference','Southern Football Conference'], 'Southeastern Conference', 'US Sports', 2),
('What is the name of the hockey arena in New York City where the Rangers play?', ARRAY['Barclays Center','Nassau Coliseum','Madison Square Garden','Prudential Center'], 'Madison Square Garden', 'US Sports', 2),
('Which American tennis player won the US Open six times between 1994 and 2002?', ARRAY['Andre Agassi','Pete Sampras','Jim Courier','Michael Chang'], 'Pete Sampras', 'US Sports', 2),
('What is the name of the record-setting consecutive games streak that Cal Ripken Jr. achieved?', ARRAY['2,000 games','2,130 games','2,632 games','3,000 games'], '2,632 games', 'US Sports', 2),
('Which NFL quarterback holds the record for most career touchdown passes?', ARRAY['Tom Brady','Peyton Manning','Drew Brees','Brett Favre'], 'Tom Brady', 'US Sports', 3),
('What is the name of the American gymnast who won four gold medals at the 1984 Los Angeles Olympics?', ARRAY['Kerri Strug','Shannon Miller','Mary Lou Retton','Dominique Dawes'], 'Mary Lou Retton', 'US Sports', 3),
('Which NHL team has won the most Stanley Cup championships?', ARRAY['Detroit Red Wings','Toronto Maple Leafs','New York Rangers','Montreal Canadiens'], 'Montreal Canadiens', 'US Sports', 3),
('Who was the first Black head coach to win a Super Bowl?', ARRAY['Tony Dungy','Mike Tomlin','Lovie Smith','Jim Caldwell'], 'Tony Dungy', 'US Sports', 3),
('Which American athlete won the decathlon at both the 1912 and the "best athlete in the world" recognition?', ARRAY['Jesse Owens','Bob Mathias','Jim Thorpe','Rafer Johnson'], 'Jim Thorpe', 'US Sports', 3),
('What is the name of the oldest continuously operating sports franchise in America?', ARRAY['Cincinnati Reds','Atlanta Braves','Chicago Cubs','Boston Red Sox'], 'Atlanta Braves', 'US Sports', 3),
('Which basketball player scored 100 points in a single NBA game?', ARRAY['Michael Jordan','Kareem Abdul-Jabbar','LeBron James','Wilt Chamberlain'], 'Wilt Chamberlain', 'US Sports', 3),
('What is the name of the famous golf course in Pebble Beach, California, that hosts major tournaments?', ARRAY['Augusta National','Pebble Beach Golf Links','Torrey Pines','Riviera Country Club'], 'Pebble Beach Golf Links', 'US Sports', 3),
('Which American boxer is known as "Iron Mike" and held the WBC, WBA, and IBF titles simultaneously?', ARRAY['George Foreman','Evander Holyfield','Mike Tyson','Lennox Lewis'], 'Mike Tyson', 'US Sports', 3),
('What is the name of the NHL record holder for most career goals?', ARRAY['Gordie Howe','Bobby Hull','Mark Messier','Wayne Gretzky'], 'Wayne Gretzky', 'US Sports', 3),
('Which NASCAR track is known as the "World Center of Racing" and hosts the Daytona 500?', ARRAY['Talladega Superspeedway','Bristol Motor Speedway','Daytona International Speedway','Indianapolis Motor Speedway'], 'Daytona International Speedway', 'US Sports', 3),
('Who was the first woman inducted into the Basketball Hall of Fame?', ARRAY['Cheryl Miller','Pat Summit','Ann Meyers','Nera White'], 'Nera White', 'US Sports', 3),
('What is the name of the famous horse that won the Triple Crown in 1973 by a record-setting margin?', ARRAY['Citation','Affirmed','Secretariat','Seattle Slew'], 'Secretariat', 'US Sports', 3),
('Which American sprinter won four gold medals at the 1984 Los Angeles Olympics?', ARRAY['Edwin Moses','Carl Lewis','Leroy Burrell','Dennis Mitchell'], 'Carl Lewis', 'US Sports', 3),
('What is the name of the record number of points Wayne Gretzky scored in a single NHL season?', ARRAY['155','185','215','255'], '215', 'US Sports', 3),
('Which NFL team was the first to win five Super Bowls?', ARRAY['Pittsburgh Steelers','San Francisco 49ers','Dallas Cowboys','New York Giants'], 'San Francisco 49ers', 'US Sports', 3),
('Who holds the MLB record for most career stolen bases?', ARRAY['Ty Cobb','Lou Brock','Tim Raines','Rickey Henderson'], 'Rickey Henderson', 'US Sports', 4),
('Which college basketball coach won the most NCAA Tournament championships?', ARRAY['Bob Knight','Mike Krzyzewski','Adolph Rupp','John Wooden'], 'John Wooden', 'US Sports', 4),
('What is the name of the first American to win the Tour de France cycling race?', ARRAY['Floyd Landis','Lance Armstrong','Greg LeMond','Tyler Hamilton'], 'Greg LeMond', 'US Sports', 4),
('Which NFL player holds the record for most career rushing yards?', ARRAY['Walter Payton','Barry Sanders','Emmitt Smith','Eric Dickerson'], 'Emmitt Smith', 'US Sports', 4),
('What is the name of the famous triathlon held annually in Kona, Hawaii?', ARRAY['Ironman World Championship','Escape from Alcatraz','XTERRA','Escape the Cape'], 'Ironman World Championship', 'US Sports', 4),
('Which NBA team was known as the "Showtime" Lakers in the 1980s?', ARRAY['Los Angeles Lakers','Philadelphia 76ers','Boston Celtics','Detroit Pistons'], 'Los Angeles Lakers', 'US Sports', 4),
('Who holds the record for most career saves in NHL history?', ARRAY['Patrick Roy','Martin Brodeur','Dominik Hasek','Roberto Luongo'], 'Martin Brodeur', 'US Sports', 4),
('What is the name of the famous Penn State football coach who won the most games in Division I history?', ARRAY['Bear Bryant','Bobby Bowden','Joe Paterno','Tom Osborne'], 'Joe Paterno', 'US Sports', 4),
('Which NFL player is known as "Prime Time" and played both football and baseball professionally?', ARRAY['Bo Jackson','Deion Sanders','Brian Jordan','D.J. Dozier'], 'Deion Sanders', 'US Sports', 4),
('What is the name of the baseball stadium in San Francisco that opened in 2000 and sits on San Francisco Bay?', ARRAY['Dodger Stadium','Oracle Park','Petco Park','American Family Field'], 'Oracle Park', 'US Sports', 4),
('Which American gymnast won the most Olympic gold medals in gymnastics history?', ARRAY['Shannon Miller','Kerri Strug','Simone Biles','Mary Lou Retton'], 'Simone Biles', 'US Sports', 4),
('What is the official name of the MVP award given in the NFL each season?', ARRAY['Bert Bell Award','Pete Rozelle Trophy','AP NFL Most Valuable Player Award','Jim Thorpe Award'], 'AP NFL Most Valuable Player Award', 'US Sports', 5),
('Which hockey player won the Conn Smythe Trophy a record three times as playoff MVP?', ARRAY['Wayne Gretzky','Bobby Orr','Patrick Roy','Guy Lafleur'], 'Patrick Roy', 'US Sports', 5),
('What is the name of the annual award given to the best college football player in America?', ARRAY['Lombardi Award','Outland Trophy','Heisman Trophy','Biletnikoff Award'], 'Heisman Trophy', 'US Sports', 5),
('Which NASCAR driver won a record 200 career Cup Series races?', ARRAY['Dale Earnhardt Sr.','Jimmie Johnson','Jeff Gordon','Richard Petty'], 'Richard Petty', 'US Sports', 5),
('What is the name of the record for most consecutive games played in NBA history?', ARRAY['828 games (Michael Doleac)','906 games (A.C. Green)','1,000 games (Kareem Abdul-Jabbar)','1,192 games (John Stockton)'], '906 games (A.C. Green)', 'US Sports', 5),
('Which pitcher threw the only perfect game in World Series history?', ARRAY['Sandy Koufax','Don Larsen','Cy Young','Catfish Hunter'], 'Don Larsen', 'US Sports', 5),
('Who was the first American to win an Olympic gold medal in figure skating?', ARRAY['Peggy Fleming','Dorothy Hamill','Tenley Albright','Carol Heiss'], 'Tenley Albright', 'US Sports', 6),
('Which NFL team won the first two Super Bowls?', ARRAY['Dallas Cowboys','Miami Dolphins','Kansas City Chiefs','Green Bay Packers'], 'Green Bay Packers', 'US Sports', 6),
('What is the name of the famous Boston Marathon course landmark known as "Heartbreak Hill"?', ARRAY['Mile 18','Mile 20','Mile 21','Mile 24'], 'Mile 21', 'US Sports', 6),
('Which baseball player set the record for most home runs in a single season before Barry Bonds in 2001?', ARRAY['Babe Ruth','Roger Maris','Sammy Sosa','Mark McGwire'], 'Mark McGwire', 'US Sports', 6),
('What is the name of the college football rivalry game between Michigan and Ohio State?', ARRAY['The Game','The Battle','The Rivalry','The Big One'], 'The Game', 'US Sports', 6),
('Which NFL player won the Super Bowl MVP award a record three times?', ARRAY['Tom Brady','Bart Starr','Joe Montana','Terry Bradshaw'], 'Tom Brady', 'US Sports', 7),
('What is the name of the famous 1969 boxing match between Muhammad Ali and Joe Frazier known as the "Fight of the Century"?', ARRAY['Thrilla in Manila','Rumble in the Jungle','Fight of the Century','The Greatest Fight'], 'Fight of the Century', 'US Sports', 7),
('Which NHL player scored the most goals in a single season?', ARRAY['Mike Bossy','Brett Hull','Mario Lemieux','Wayne Gretzky'], 'Wayne Gretzky', 'US Sports', 7),
('What is the name of the famous basketball arena in Boston where the Celtics played for decades?', ARRAY['TD Garden','FleetCenter','Boston Garden','Boston Arena'], 'Boston Garden', 'US Sports', 7),
('Which college basketball team won the most consecutive NCAA Tournament championships?', ARRAY['Duke','Kentucky','UCLA','North Carolina'], 'UCLA', 'US Sports', 7),
('What is the name of the first African American to play in the NHL?', ARRAY['Grant Fuhr','Willie O''Ree','Herb Carnegie','Fred Sasakamoose'], 'Willie O''Ree', 'US Sports', 8),
('Which pitcher holds the MLB record for most career strikeouts?', ARRAY['Roger Clemens','Randy Johnson','Steve Carlton','Nolan Ryan'], 'Nolan Ryan', 'US Sports', 8),
('What is the name of the famous 1980 U.S. Olympic hockey team that defeated the Soviet Union?', ARRAY['Miracle on Ice team','Dream Team','Gold Medal Squad','USA Hockey All-Stars'], 'Miracle on Ice team', 'US Sports', 8),
('Which NFL team went undefeated during the regular season and playoffs in 1972?', ARRAY['Pittsburgh Steelers','Dallas Cowboys','Miami Dolphins','Los Angeles Rams'], 'Miami Dolphins', 'US Sports', 8),
('What is the name of the first woman to compete in an Indianapolis 500 race?', ARRAY['Danica Patrick','Janet Guthrie','Milka Duno','Sarah Fisher'], 'Janet Guthrie', 'US Sports', 9),
('Which golfer holds the record for most major championships won?', ARRAY['Tiger Woods','Arnold Palmer','Ben Hogan','Jack Nicklaus'], 'Jack Nicklaus', 'US Sports', 9),
('What is the name of the record number of consecutive Wimbledon titles won by an American male?', ARRAY['4 (John McEnroe)','5 (Pete Sampras)','3 (Jimmy Connors)','6 (Andre Agassi)'], '5 (Pete Sampras)', 'US Sports', 9),
('Which American Olympic boxer won gold medals in three different weight classes?', ARRAY['Floyd Mayweather Jr.','Oscar De La Hoya','Sugar Ray Leonard','Roy Jones Jr.'], 'Oscar De La Hoya', 'US Sports', 9);

INSERT INTO public.questions (text, options, correct_answer, category, difficulty) VALUES
('Which inventor is credited with creating the phonograph and motion picture camera?', ARRAY['Nikola Tesla','Alexander Graham Bell','Thomas Edison','Samuel Morse'], 'Thomas Edison', 'Famous Americans', 1),
('Which famous civil rights activist refused to give up her seat on a Montgomery bus in 1955?', ARRAY['Harriet Tubman','Sojourner Truth','Coretta Scott King','Rosa Parks'], 'Rosa Parks', 'Famous Americans', 1),
('Which American author wrote the adventures of Tom Sawyer and Huckleberry Finn?', ARRAY['Jack London','O. Henry','Mark Twain','Upton Sinclair'], 'Mark Twain', 'Famous Americans', 1),
('Who founded Apple Inc. and revolutionized personal computing?', ARRAY['Bill Gates','Steve Wozniak','Steve Jobs','Mark Zuckerberg'], 'Steve Jobs', 'Famous Americans', 1),
('Which American first lady was known for her "Just Say No" anti-drug campaign?', ARRAY['Hillary Clinton','Barbara Bush','Nancy Reagan','Betty Ford'], 'Nancy Reagan', 'Famous Americans', 1),
('Which famous American preacher and civil rights leader delivered the "I Have a Dream" speech?', ARRAY['Jesse Jackson','Malcolm X','John Lewis','Martin Luther King Jr.'], 'Martin Luther King Jr.', 'Famous Americans', 1),
('Who was the first woman to serve as U.S. Secretary of State?', ARRAY['Hillary Clinton','Condoleezza Rice','Madeleine Albright','Janet Reno'], 'Madeleine Albright', 'Famous Americans', 1),
('Which American invented the telephone?', ARRAY['Thomas Edison','Samuel Morse','Nikola Tesla','Alexander Graham Bell'], 'Alexander Graham Bell', 'Famous Americans', 1),
('Who was the first American to orbit the Earth?', ARRAY['Neil Armstrong','Buzz Aldrin','Alan Shepard','John Glenn'], 'John Glenn', 'Famous Americans', 1),
('Which famous American actress starred in "Some Like It Hot" and "Gentlemen Prefer Blondes"?', ARRAY['Grace Kelly','Audrey Hepburn','Marilyn Monroe','Elizabeth Taylor'], 'Marilyn Monroe', 'Famous Americans', 1),
('Who wrote the Declaration of Independence?', ARRAY['Benjamin Franklin','John Adams','George Washington','Thomas Jefferson'], 'Thomas Jefferson', 'Famous Americans', 1),
('Which famous American abolitionist escaped slavery and helped others escape through the Underground Railroad?', ARRAY['Frederick Douglass','Sojourner Truth','Harriet Tubman','Nat Turner'], 'Harriet Tubman', 'Famous Americans', 1),
('Who founded Microsoft Corporation?', ARRAY['Steve Jobs','Larry Page','Mark Zuckerberg','Bill Gates'], 'Bill Gates', 'Famous Americans', 1),
('Which American singer is known as the "King of Rock and Roll"?', ARRAY['Chuck Berry','Little Richard','Jerry Lee Lewis','Elvis Presley'], 'Elvis Presley', 'Famous Americans', 1),
('Who painted the Sistine Chapel ceiling? (Trick question — this is American history) Which American painter is known for his Saturday Evening Post covers?', ARRAY['Grant Wood','Norman Rockwell','Edward Hopper','Andrew Wyeth'], 'Norman Rockwell', 'Famous Americans', 1),
('Which American suffragist was a leader of the women''s rights movement and co-founded the National Woman Suffrage Association?', ARRAY['Elizabeth Cady Stanton','Sojourner Truth','Ida B. Wells','Carrie Chapman Catt'], 'Elizabeth Cady Stanton', 'Famous Americans', 1),
('Who was the 16th President of the United States who issued the Emancipation Proclamation?', ARRAY['Ulysses S. Grant','Andrew Jackson','Abraham Lincoln','James Buchanan'], 'Abraham Lincoln', 'Famous Americans', 1),
('Which American musician is known as the "King of Pop"?', ARRAY['Prince','Stevie Wonder','Michael Jackson','James Brown'], 'Michael Jackson', 'Famous Americans', 1),
('Who was the first American to win the Nobel Peace Prize?', ARRAY['Woodrow Wilson','Theodore Roosevelt','Jimmy Carter','Martin Luther King Jr.'], 'Theodore Roosevelt', 'Famous Americans', 1),
('Which famous American astronaut was the first to walk on the Moon?', ARRAY['Buzz Aldrin','John Glenn','Alan Shepard','Neil Armstrong'], 'Neil Armstrong', 'Famous Americans', 1),
('Who was the first African American President of the United States?', ARRAY['Colin Powell','Barack Obama','Jesse Jackson','Al Sharpton'], 'Barack Obama', 'Famous Americans', 1),
('Which American inventor and statesman is credited with discovering electricity''s role in lightning through a kite experiment?', ARRAY['Thomas Edison','Benjamin Franklin','Nikola Tesla','Alexander Graham Bell'], 'Benjamin Franklin', 'Famous Americans', 2),
('Which American poet wrote "The Road Not Taken" and "Stopping by Woods on a Snowy Evening"?', ARRAY['Carl Sandburg','Walt Whitman','Robert Frost','Langston Hughes'], 'Robert Frost', 'Famous Americans', 2),
('Who was the first female Justice on the U.S. Supreme Court?', ARRAY['Ruth Bader Ginsburg','Sonia Sotomayor','Elena Kagan','Sandra Day O''Connor'], 'Sandra Day O''Connor', 'Famous Americans', 2),
('Which famous American industrialist founded the Ford Motor Company?', ARRAY['Andrew Carnegie','John D. Rockefeller','J.P. Morgan','Henry Ford'], 'Henry Ford', 'Famous Americans', 2),
('Who was the first American woman to win a Nobel Prize in Literature?', ARRAY['Toni Morrison','Pearl S. Buck','Harper Lee','Edith Wharton'], 'Pearl S. Buck', 'Famous Americans', 2),
('Which American author wrote "To Kill a Mockingbird"?', ARRAY['Flannery O''Connor','Carson McCullers','Harper Lee','Truman Capote'], 'Harper Lee', 'Famous Americans', 2),
('Who was the first African American to serve as Secretary of State?', ARRAY['Eric Holder','Colin Powell','Condoleezza Rice','Vernon Jordan'], 'Colin Powell', 'Famous Americans', 2),
('Which American inventor co-invented the airplane with his brother Wilbur?', ARRAY['Glenn Curtiss','Charles Langley','Samuel Langley','Orville Wright'], 'Orville Wright', 'Famous Americans', 2),
('Which American activist and orator escaped slavery and became a leading abolitionist?', ARRAY['Nat Turner','Harriet Tubman','Sojourner Truth','Frederick Douglass'], 'Frederick Douglass', 'Famous Americans', 2),
('Who was the famous frontiersman known as "Davy Crockett" who died at the Alamo?', ARRAY['Daniel Boone','Kit Carson','Jim Bowie','Davy Crockett'], 'Davy Crockett', 'Famous Americans', 2),
('Which famous American poet wrote "Leaves of Grass"?', ARRAY['Edgar Allan Poe','Ralph Waldo Emerson','Emily Dickinson','Walt Whitman'], 'Walt Whitman', 'Famous Americans', 2),
('Who was the first American to win the Nobel Prize in Physics?', ARRAY['Robert Millikan','Albert Michelson','Arthur Compton','J. Robert Oppenheimer'], 'Albert Michelson', 'Famous Americans', 2),
('Which American writer is known for "The Adventures of Sherlock Holmes"? (Trick — name the American who wrote "The Tell-Tale Heart")', ARRAY['Nathaniel Hawthorne','Herman Melville','Washington Irving','Edgar Allan Poe'], 'Edgar Allan Poe', 'Famous Americans', 2),
('Who was the famous Native American chief of the Oglala Lakota who led the Battle of Little Bighorn?', ARRAY['Sitting Bull','Geronimo','Red Cloud','Crazy Horse'], 'Crazy Horse', 'Famous Americans', 2),
('Which American singer-songwriter wrote "This Land Is Your Land" and became a symbol of folk music?', ARRAY['Pete Seeger','Bob Dylan','Woody Guthrie','Joan Baez'], 'Woody Guthrie', 'Famous Americans', 2),
('Who was the famous test pilot who broke the sound barrier for the first time in 1947?', ARRAY['Jimmy Doolittle','Chuck Yeager','Charles Lindbergh','Eddie Rickenbacker'], 'Chuck Yeager', 'Famous Americans', 2),
('Which American scientist developed the polio vaccine?', ARRAY['Jonas Salk','Albert Sabin','Alexander Fleming','Louis Pasteur'], 'Jonas Salk', 'Famous Americans', 2),
('Who was the first woman to fly solo across the Atlantic Ocean?', ARRAY['Bessie Coleman','Jacqueline Cochran','Amelia Earhart','Ruth Elder'], 'Amelia Earhart', 'Famous Americans', 2),
('Which American civil rights leader was the first African American to serve as a Supreme Court Justice?', ARRAY['Thurgood Marshall','Charles Hamilton Houston','Constance Baker Motley','John Conyers'], 'Thurgood Marshall', 'Famous Americans', 2),
('Which famous American business magnate founded Amazon?', ARRAY['Larry Ellison','Elon Musk','Jeff Bezos','Peter Thiel'], 'Jeff Bezos', 'Famous Americans', 2),
('Who was the famous Lakota Sioux chief who led the resistance against the U.S. government and was present at Little Bighorn?', ARRAY['Red Cloud','Crazy Horse','Black Hawk','Sitting Bull'], 'Sitting Bull', 'Famous Americans', 3),
('Which American painter is known for her depictions of the American Southwest and oversized flowers?', ARRAY['Mary Cassatt','Georgia O''Keeffe','Grandma Moses','Helen Frankenthaler'], 'Georgia O''Keeffe', 'Famous Americans', 3),
('Which American poet is known for writing in lower case and unconventional punctuation, with poems like "anyone lived in a pretty how town"?', ARRAY['Wallace Stevens','e.e. cummings','Marianne Moore','William Carlos Williams'], 'e.e. cummings', 'Famous Americans', 3),
('Who was the first American woman in space?', ARRAY['Mae C. Jemison','Shannon Lucid','Judith Resnik','Sally Ride'], 'Sally Ride', 'Famous Americans', 3),
('Which American author wrote "The Grapes of Wrath," depicting the lives of Dust Bowl migrants?', ARRAY['Sinclair Lewis','John Dos Passos','John Steinbeck','Sherwood Anderson'], 'John Steinbeck', 'Famous Americans', 3),
('Who was the famous American architect who designed the geodesic dome?', ARRAY['Louis Kahn','Philip Johnson','R. Buckminster Fuller','Paul Rudolph'], 'R. Buckminster Fuller', 'Famous Americans', 3),
('Which American blues musician is known as the "King of the Delta Blues" and is said to have sold his soul at a crossroads?', ARRAY['Muddy Waters','Howlin'' Wolf','Robert Johnson','Son House'], 'Robert Johnson', 'Famous Americans', 3),
('Who was the first woman to run for President of the United States on a major party ticket?', ARRAY['Geraldine Ferraro','Hillary Clinton','Shirley Chisholm','Victoria Woodhull'], 'Victoria Woodhull', 'Famous Americans', 3),
('Which American scientist discovered the electron and conducted the famous oil drop experiment?', ARRAY['J. Robert Oppenheimer','Richard Feynman','Robert Millikan','Enrico Fermi'], 'Robert Millikan', 'Famous Americans', 3),
('Which American jazz musician is known as the "Father of Bebop" and revolutionized jazz in the 1940s?', ARRAY['Miles Davis','Dizzy Gillespie','Charlie Parker','Thelonious Monk'], 'Charlie Parker', 'Famous Americans', 3),
('Who was the famous American dancer and choreographer known as the "Mother of Modern Dance"?', ARRAY['Agnes de Mille','Martha Graham','Isadora Duncan','Ruth St. Denis'], 'Martha Graham', 'Famous Americans', 3),
('Which American novelist wrote "The Color Purple," which won the Pulitzer Prize?', ARRAY['Toni Morrison','Zora Neale Hurston','Maya Angelou','Alice Walker'], 'Alice Walker', 'Famous Americans', 3),
('Who was the famous Apache leader who resisted U.S. and Mexican government forces and surrendered in 1886?', ARRAY['Sitting Bull','Cochise','Red Cloud','Geronimo'], 'Geronimo', 'Famous Americans', 3),
('Which American jazz musician is known for the album "Kind of Blue," the best-selling jazz album of all time?', ARRAY['John Coltrane','Thelonious Monk','Duke Ellington','Miles Davis'], 'Miles Davis', 'Famous Americans', 3),
('Who was the first American to receive the Nobel Prize in Literature?', ARRAY['Ernest Hemingway','William Faulkner','Sinclair Lewis','John Steinbeck'], 'Sinclair Lewis', 'Famous Americans', 3),
('Which American activist is credited with co-founding the National Association for the Advancement of Colored People (NAACP)?', ARRAY['Booker T. Washington','W.E.B. Du Bois','Marcus Garvey','Ida B. Wells'], 'W.E.B. Du Bois', 'Famous Americans', 3),
('Who was the famous female aviator who was the first African American woman to earn a pilot''s license?', ARRAY['Amelia Earhart','Harriet Quimby','Bessie Coleman','Willa Brown'], 'Bessie Coleman', 'Famous Americans', 3),
('Which American musician is credited with inventing rock and roll or is known as one of its pioneers for songs like "Johnny B. Goode"?', ARRAY['Little Richard','Buddy Holly','Bo Diddley','Chuck Berry'], 'Chuck Berry', 'Famous Americans', 4),
('Who was the first American to win the Nobel Prize in Chemistry?', ARRAY['Linus Pauling','Glenn Seaborg','Theodore Richards','Willard Libby'], 'Theodore Richards', 'Famous Americans', 4),
('Which American author wrote the short story "The Gift of the Magi" under the pen name O. Henry?', ARRAY['William Sydney Porter','Ambrose Bierce','Bret Harte','Ring Lardner'], 'William Sydney Porter', 'Famous Americans', 4),
('Who was the famous American photographer known for her images of migrant workers during the Great Depression?', ARRAY['Diane Arbus','Dorothea Lange','Margaret Bourke-White','Berenice Abbott'], 'Dorothea Lange', 'Famous Americans', 4),
('Which American physicist is known as the "Father of the Atomic Bomb" and directed the Manhattan Project''s Los Alamos Laboratory?', ARRAY['Enrico Fermi','Edward Teller','Leo Szilard','J. Robert Oppenheimer'], 'J. Robert Oppenheimer', 'Famous Americans', 4),
('Who was the famous American poet known for her reclusive lifestyle and slant rhymes, writing nearly 1,800 poems in her lifetime?', ARRAY['Amy Lowell','Edna St. Vincent Millay','Sara Teasdale','Emily Dickinson'], 'Emily Dickinson', 'Famous Americans', 4),
('Which American singer-songwriter is known as "Brother Ray" and combined gospel, blues, and jazz into soul music?', ARRAY['Sam Cooke','James Brown','Ray Charles','Otis Redding'], 'Ray Charles', 'Famous Americans', 4),
('Who was the first American woman to win a Nobel Prize in Peace?', ARRAY['Eleanor Roosevelt','Jane Addams','Emily Greene Balch','Betty Williams'], 'Jane Addams', 'Famous Americans', 4),
('Which American author wrote the novel "Moby-Dick"?', ARRAY['Nathaniel Hawthorne','James Fenimore Cooper','Herman Melville','Washington Irving'], 'Herman Melville', 'Famous Americans', 4),
('Who was the famous American entrepreneur who founded the Standard Oil Company?', ARRAY['Andrew Carnegie','J.P. Morgan','Cornelius Vanderbilt','John D. Rockefeller'], 'John D. Rockefeller', 'Famous Americans', 4),
('Which American musician is known as the "Godfather of Soul" for his energetic performances and pioneering funk music?', ARRAY['Marvin Gaye','Aretha Franklin','James Brown','Sly Stone'], 'James Brown', 'Famous Americans', 4),
('Who was the first Native American to win an Olympic gold medal?', ARRAY['Billy Mills','Jim Thorpe','Ellison Brown','Louis Tewanima'], 'Jim Thorpe', 'Famous Americans', 5),
('Which American journalist and author is known for "The Feminine Mystique," which helped ignite the second-wave feminist movement?', ARRAY['Gloria Steinem','Kate Millett','Betty Friedan','Germaine Greer'], 'Betty Friedan', 'Famous Americans', 5),
('Which American painter is associated with the Ashcan School and known for realistic urban scenes?', ARRAY['Thomas Eakins','John Sloan','Winslow Homer','Frederic Remington'], 'John Sloan', 'Famous Americans', 5),
('Who was the first American to win the Nobel Prize in Medicine?', ARRAY['Jonas Salk','Harvey Cushing','Karl Landsteiner','Alexis Carrel'], 'Alexis Carrel', 'Famous Americans', 5),
('Which American author wrote "The Sun Also Rises" and "A Farewell to Arms"?', ARRAY['F. Scott Fitzgerald','William Faulkner','Sinclair Lewis','Ernest Hemingway'], 'Ernest Hemingway', 'Famous Americans', 5),
('Who was the famous American abolitionist and newspaper editor who published "The Liberator"?', ARRAY['Frederick Douglass','Harriet Beecher Stowe','Elijah Lovejoy','William Lloyd Garrison'], 'William Lloyd Garrison', 'Famous Americans', 5),
('Which American singer is known as the "Queen of Soul" and was the first woman inducted into the Rock and Roll Hall of Fame?', ARRAY['Diana Ross','Tina Turner','Patti LaBelle','Aretha Franklin'], 'Aretha Franklin', 'Famous Americans', 5),
('Who was the famous American anthropologist known for "Coming of Age in Samoa" and advocacy for cultural relativism?', ARRAY['Ruth Benedict','Zora Neale Hurston','Margaret Mead','Ashley Montagu'], 'Margaret Mead', 'Famous Americans', 5),
('Which American inventor developed the lightning rod, bifocals, and the flexible urinary catheter?', ARRAY['Thomas Edison','Benjamin Franklin','Eli Whitney','Samuel Morse'], 'Benjamin Franklin', 'Famous Americans', 5),
('Who was the famous American social activist who co-founded Hull House in Chicago to help immigrants?', ARRAY['Lillian Wald','Florence Kelley','Jane Addams','Julia Lathrop'], 'Jane Addams', 'Famous Americans', 6),
('Which American author wrote "Their Eyes Were Watching God," a landmark of African American literature?', ARRAY['Nella Larsen','Jean Toomer','Zora Neale Hurston','Jessie Fauset'], 'Zora Neale Hurston', 'Famous Americans', 6),
('Who was the famous American physicist who developed the theory of quantum electrodynamics and the Feynman diagrams?', ARRAY['Murray Gell-Mann','Julian Schwinger','John Wheeler','Richard Feynman'], 'Richard Feynman', 'Famous Americans', 6),
('Which American poet and activist wrote "I Know Why the Caged Bird Sings"?', ARRAY['Nikki Giovanni','Gwendolyn Brooks','Sonia Sanchez','Maya Angelou'], 'Maya Angelou', 'Famous Americans', 6),
('Who was the famous American chemist who discovered nylon and worked at DuPont?', ARRAY['Wallace Carothers','Leo Baekeland','Roy Plunkett','Herman Mark'], 'Wallace Carothers', 'Famous Americans', 6),
('Which American jazz musician is known as the "Duke" and led one of the most famous big bands in history?', ARRAY['Count Basie','Benny Goodman','Glenn Miller','Duke Ellington'], 'Duke Ellington', 'Famous Americans', 6),
('Who was the famous American mathematician and cryptographer who broke German Enigma codes in WWII? (Note: this was Alan Turing — name the American who invented ENIAC)', ARRAY['John von Neumann','Alan Turing','John Presper Eckert','Norbert Wiener'], 'John Presper Eckert', 'Famous Americans', 6),
('Which American environmental activist and author wrote "Silent Spring," helping launch the modern environmental movement?', ARRAY['John Muir','Edward Abbey','Aldo Leopold','Rachel Carson'], 'Rachel Carson', 'Famous Americans', 6),
('Who was the famous American abstract expressionist painter known for drip paintings?', ARRAY['Mark Rothko','Franz Kline','Willem de Kooning','Jackson Pollock'], 'Jackson Pollock', 'Famous Americans', 7),
('Which American linguist and political commentator is known as the "Father of Modern Linguistics"?', ARRAY['B.F. Skinner','William Labov','Noam Chomsky','Leonard Bloomfield'], 'Noam Chomsky', 'Famous Americans', 7),
('Who was the famous American labor leader who co-founded the United Farm Workers union?', ARRAY['Samuel Gompers','Eugene V. Debs','Mother Jones','Cesar Chavez'], 'Cesar Chavez', 'Famous Americans', 7),
('Which American author wrote the "Rabbit" series of novels spanning four decades?', ARRAY['Philip Roth','Saul Bellow','John Updike','Don DeLillo'], 'John Updike', 'Famous Americans', 7),
('Who was the famous American dancer and choreographer who helped develop hip-hop theater?', ARRAY['Alvin Ailey','Arthur Mitchell','Bill T. Jones','Judith Jamison'], 'Bill T. Jones', 'Famous Americans', 7),
('Which American scientist and inventor developed the first practical incandescent light bulb and improved on earlier designs?', ARRAY['Nikola Tesla','Charles Brush','Thomas Edison','George Westinghouse'], 'Thomas Edison', 'Famous Americans', 8),
('Who was the famous American writer known as the "Sage of Baltimore" and the author of "The American Language"?', ARRAY['Edmund Wilson','Walter Lippmann','H.L. Mencken','Van Wyck Brooks'], 'H.L. Mencken', 'Famous Americans', 8),
('Which American composer wrote "Rhapsody in Blue" and "An American in Paris"?', ARRAY['Leonard Bernstein','Aaron Copland','Samuel Barber','George Gershwin'], 'George Gershwin', 'Famous Americans', 8),
('Who was the famous American labor organizer and socialist known as "Big Bill" who co-founded the Industrial Workers of the World?', ARRAY['Eugene V. Debs','Samuel Gompers','Mother Jones','William D. Haywood'], 'William D. Haywood', 'Famous Americans', 8),
('Which American novelist wrote the postmodern novel "Infinite Jest" and is known for his use of footnotes?', ARRAY['Thomas Pynchon','Don DeLillo','David Foster Wallace','Jonathan Franzen'], 'David Foster Wallace', 'Famous Americans', 8),
('Who was the famous American inventor who developed alternating current (AC) electrical systems and the Tesla coil?', ARRAY['George Westinghouse','Thomas Edison','Charles Steinmetz','Nikola Tesla'], 'Nikola Tesla', 'Famous Americans', 9),
('Which American mathematician is known for the Nash equilibrium in game theory, depicted in the film "A Beautiful Mind"?', ARRAY['John von Neumann','Kenneth Arrow','John Nash','Paul Samuelson'], 'John Nash', 'Famous Americans', 9),
('Who was the famous American modernist poet who wrote "The Cantos" and was arrested for treason during World War II?', ARRAY['T.S. Eliot','William Carlos Williams','H.D.','Ezra Pound'], 'Ezra Pound', 'Famous Americans', 9),
('Which American photographer is known for his large-format black and white photographs of the American West, particularly Yosemite?', ARRAY['Edward Weston','Alfred Stieglitz','Paul Strand','Ansel Adams'], 'Ansel Adams', 'Famous Americans', 9),
('Who was the famous American sociologist and author of "The Souls of Black Folk," which articulated the concept of "double consciousness"?', ARRAY['Carter G. Woodson','Booker T. Washington','Alain Locke','W.E.B. Du Bois'], 'W.E.B. Du Bois', 'Famous Americans', 9);

