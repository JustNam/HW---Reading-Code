import { useCallback, useState } from "react";
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
  const [title, setTitle] = useState("Đây là tên của plan");
  const [researchQuestion, setResearchQuestion] = useState([
    {
      questionContent: "Đây là câu hỏi nghiên cứu",
      interviewQs: ["Đây là câu hỏi phỏng vấn", "Đây là câu hỏi phỏng vấn 2"],
    },
  ]);

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  function handleAddQuestion() {
    const newQuestion = { questionContent: "", interviewQs: [] };
    const newList = [...researchQuestion, newQuestion];
    setResearchQuestion(newList);
  }

  function handleDeleteQuestion(index) {
    const newList = researchQuestion.filter((q, qIndex) => qIndex !== index);
    setResearchQuestion(newList);
  }

  function handleEditResearchQ(index, newValue) {
    const newList = researchQuestion.map((q, qIndex) =>
      qIndex !== index ? q : { ...q, questionContent: newValue },
    );
    setResearchQuestion(newList);
  }

  function handleAddInterviewQ(qIndex) {
    const newList = researchQuestion.map((i, subIndex) =>
      subIndex !== qIndex ? i : { ...i, interviewQs: [...i.interviewQs, ""] },
    );
    setResearchQuestion(newList);
  }

  function handleEditInterviewQ(qIndex, subIndex, newValue) {
    const newList = researchQuestion.map(
      (q, i) =>
        i !== qIndex
          ? q
          : {
              ...q,
              interviewQs: q.interviewQs.map(
                (sub, j) => (j !== subIndex ? sub : newValue),
              ),
            },
    );
    setResearchQuestion(newList);
  }

  function handleDeleteInterviewQ(qIndex, subIndex) {
    const newList = researchQuestion.map((q, i) =>
      i !== qIndex
        ? q
        : {
            ...q,
            interviewQs: q.interviewQs.filter((sub, j) => j !== subIndex),
          },
    );
    setResearchQuestion(newList);
  }

  return (
    <Stack spacing={3} sx={{ maxWidth: 640, mx: "auto", p: 3 }}>
      <Typography variant="h5" fontWeight={600}>
        Research Plan
      </Typography>

      <TextField
        label="Plan title"
        value={title}
        onChange={handleTitleChange}
        fullWidth
      />
      <Divider />

      {researchQuestion.map((q, qIndex) => (
        <Stack
          key={qIndex}
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
              value={q.questionContent}
              onChange={(e) => handleEditResearchQ(qIndex, e.target.value)}
              fullWidth
            />
            <IconButton onClick={() => handleDeleteQuestion(qIndex)}>
              <DeleteOutlineIcon />
            </IconButton>
          </Stack>

          {q.interviewQs.map((sub, subIndex) => (
            <Stack
              key={subIndex}
              direction="row"
              spacing={1}
              alignItems="center"
              sx={{ pl: 3 }}
            >
              <TextField
                label="Interview question"
                size="small"
                value={sub}
                onChange={(e) =>
                  handleEditInterviewQ(qIndex, subIndex, e.target.value)
                }
                fullWidth
              />
              <IconButton
                onClick={() => handleDeleteInterviewQ(qIndex, subIndex)}
              >
                <DeleteOutlineIcon />
              </IconButton>
            </Stack>
          ))}

          <Button
            size="small"
            startIcon={<AddIcon />}
            onClick={() => handleAddInterviewQ(qIndex)}
            sx={{ alignSelf: "flex-start", ml: 3 }}
          >
            ADD
          </Button>
        </Stack>
      ))}

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleAddQuestion}
        sx={{ alignSelf: "flex-start" }}
      >
        Add question
      </Button>
    </Stack>
  );
}
