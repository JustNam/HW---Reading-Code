import { useState } from "react";
import {
  Stack,
  Button,
  IconButton,
  Typography,
  TextField,
  Divider,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlined";
import AddIcon from "@mui/icons-material/Add";

export default function Home() {
  const [researchQuestion, setResearchQuestion] = useState([
    { id: 1, content: "Đây là câu hỏi nghiên cứu" },
  ]);
  const [interviewQuestion, setInterviewQuestion] = useState([
    { id: 1, researchQuestionId: 1, content: "Đây là câu hỏi phỏng vấn" },
    { id: 2, researchQuestionId: 1, content: "Đây là câu hỏi phỏng vấn 2" },
  ]);

  function handleAddResearchQuestion() {
    const newItem = { id: Date.now(), content: "" };
    setResearchQuestion([...researchQuestion, newItem]);
  }

  function handleDeleteResearchQuestion(id) {
    setResearchQuestion(researchQuestion.filter((rq) => rq.id !== id));
    setInterviewQuestion(
      interviewQuestion.filter((iq) => iq.researchQuestionId !== id),
    );
  }

  function handleEditResearchQuestion(id, newValue) {
    setResearchQuestion(
      researchQuestion.map((rq) =>
        rq.id !== id ? rq : { ...rq, content: newValue },
      ),
    );
  }

  function handleAddInterviewQuestion(researchQuestionId) {
    const newItem = { id: Date.now(), researchQuestionId, content: "" };
    setInterviewQuestion([...interviewQuestion, newItem]);
  }

  function handleEditInterviewQuestion(id, newValue) {
    setInterviewQuestion(
      interviewQuestion.map((iq) =>
        iq.id !== id ? iq : { ...iq, content: newValue },
      ),
    );
  }

  function handleDeleteInterviewQuestion(id) {
    setInterviewQuestion(interviewQuestion.filter((iq) => iq.id !== id));
  }

  return (
    <Stack spacing={3} sx={{ maxWidth: 640, mx: "auto", p: 3 }}>
      <Typography variant="h5" fontWeight={600}>
        Research Plan (Relational)
      </Typography>
      <Divider />

      {researchQuestion.map((rq) => (
        <Stack
          key={rq.id}
          spacing={1.5}
          sx={{
            p: 2,
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 2,
          }}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <TextField
              label="Research question"
              value={rq.content}
              onChange={(e) =>
                handleEditResearchQuestion(rq.id, e.target.value)
              }
              fullWidth
            />
            <IconButton onClick={() => handleDeleteResearchQuestion(rq.id)}>
              <DeleteOutlineIcon />
            </IconButton>
          </Stack>

          {interviewQuestion
            .filter((iq) => iq.researchQuestionId === rq.id)
            .map((iq) => (
              <Stack
                key={iq.id}
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{ pl: 3 }}
              >
                <TextField
                  label="Interview question"
                  size="small"
                  value={iq.content}
                  onChange={(e) =>
                    handleEditInterviewQuestion(iq.id, e.target.value)
                  }
                  fullWidth
                />
                <IconButton
                  onClick={() => handleDeleteInterviewQuestion(iq.id)}
                >
                  <DeleteOutlineIcon />
                </IconButton>
              </Stack>
            ))}

          <Button
            size="small"
            startIcon={<AddIcon />}
            onClick={() => handleAddInterviewQuestion(rq.id)}
            sx={{ alignSelf: "flex-start", ml: 3 }}
          >
            ADD
          </Button>
        </Stack>
      ))}

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleAddResearchQuestion}
        sx={{ alignSelf: "flex-start" }}
      >
        Add question
      </Button>
    </Stack>
  );
}
