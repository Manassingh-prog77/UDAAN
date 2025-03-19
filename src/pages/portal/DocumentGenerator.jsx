import  { useState, useEffect } from "react";
import { Box, IconButton,Button,CircularProgress } from "@mui/material";
import { Mic, Pause } from "@mui/icons-material";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import axios from "axios";
import AvatarScene from "../../assests/Avatar";

const DocumentGenerator = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  const [userInteracted, setUserInteracted] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      console.error("Browser doesn't support speech recognition.");
    }
  }, [browserSupportsSpeechRecognition]);

  useEffect(() => {
    if (userInteracted) {
      const welcomeMessage =
        "Hello sir, my name is Drona, and I am your AI counsellor. To get started, click on the mic button shown below and tell me your query.";
      const utterance = new SpeechSynthesisUtterance(welcomeMessage);
      utterance.lang = "en-US";
      utterance.pitch = 1;
      utterance.rate = 1.25;
      window.speechSynthesis.speak(utterance);
    }
  }, [userInteracted]);

  const toggleListening = () => {
    if (listening) {
      SpeechRecognition.stopListening();
      console.log("Final Transcript:", transcript);
      ResponseGenerator(transcript);
    } else {
      resetTranscript();
      SpeechRecognition.startListening({ continuous: true });
    }
  };

  const handleUserInteraction = () => {
    setUserInteracted(true);
  };

  const GEMINI_API_KEY = "AIzaSyCILU-_ezGfu3iojbS-hFe9-Fil4klNOlo";

  const ResponseGenerator = async (usertranscript) => {
    setIsLoading(true);
    try {
      const geminiResponse = await axios.post(
        `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `
                  You are an AI named Drona, acting as a seasoned career counselor with extensive knowledge across all career domains. Your role is to analyze the user's input and provide insightful career guidance, helping them navigate their professional journey effectively. If the user's query falls outside the scope of career counseling, such as academic subject questions or unrelated topics, politely inform them that your expertise is limited to career guidance and encourage them to ask relevant questions.
  
                  **User Input:** ${usertranscript}
  
                  **Guidelines for Drona:**
                  - Listen attentively to the user's concerns and aspirations.
                  - Provide personalized advice based on the user's background, interests, and goals.
                  - Suggest actionable steps or resources to assist the user in their career development.
                  - Maintain a supportive and professional tone throughout the interaction.
                  - Avoid addressing queries unrelated to career counseling and gently redirect the user to focus on career-related topics.
  
                  **Response:**
                  `,
                },
              ],
            },
          ],
        },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log(geminiResponse.data);
      const responseText = geminiResponse.data.candidates[0].content.parts[0].text;
      speakText(responseText);
    } catch (error) {
      console.error("Please try Again", error);
    } finally {
      setIsLoading(false); 
    }
  };

  const speakText = (text) => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.pitch = 1;
    utterance.rate = 1.25;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto text-black bg-transparent">
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <AvatarScene/>
      </Box>
      {!userInteracted && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 4,
          }}
        >
          <button
            onClick={handleUserInteraction}
            style={{
              backgroundColor: "#2b7fff",
              height: 50,
              width: 180,
              borderRadius: 14,
              color: "white",
              fontWeight: "bold",
            }}
          >
            Start Conversation
          </button>
        </Box>
      )}
      {userInteracted && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap:2,
            ml:isSpeaking?10:0,
            alignItems: "center",
            justifyContent: "center",

            mt: 4,
          }}
        >
          <IconButton
            onClick={toggleListening}
            disabled={isLoading}
            sx={{
              width: 100,
              height: 100,
              backgroundColor: listening ? "red" : "#2b7fff",
              color: "white",
            }}
          >
            {isLoading ? (
            <CircularProgress sx={{ color: "white" }} />
          ) : listening ? (
            <Pause sx={{ fontSize: 50 }} />
          ) : (
            <Mic sx={{ fontSize: 50 }} />
          )}
          </IconButton>

          {isSpeaking && (
            <Button
              onClick={stopSpeaking}
              variant="outlined"
              sx={{ mt: 2,
                bgcolor: "white",
                borderRadius: "50%",
                width: 56, // Adjust the width and height as needed
                height: 56,
                minWidth: 0, // Ensures the button remains circular even if it contains an icon
                padding: 0,}}
            >
              <Pause sx={{color:"black"}}/>
            </Button>
          )}
        </Box>
      )}
    </div>
  );
};

export default DocumentGenerator;
