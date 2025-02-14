/**
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { useEffect, useRef, useState } from "react";
import { RiSidebarFoldLine, RiSidebarUnfoldLine } from "react-icons/ri";
import ReactSelect from "react-select";
import { useLiveAPIContext } from "../../contexts/LiveAPIContext";
import { useLoggerStore } from "../../lib/store-logger";
import Logger, { LoggerFilterType } from "../logger/Logger";
import { Box, IconButton, Typography, Paper, TextField, Button, useTheme } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { styled } from '@mui/material/styles';

type OptionType = {
  value: string;
  label: string;
};

const filterOptions: OptionType[] = [
  { value: "conversations", label: "Conversations" },
  { value: "tools", label: "Tool Use" },
  { value: "none", label: "All" },
];

const StyledSidePanel = styled(Box)(({ theme }) => ({
  background: theme.palette.background.paper,
  width: '72px',
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  transition: 'all 0.2s ease-in',
  borderRight: `1px solid ${theme.palette.divider}`,
  color: theme.palette.text.primary,
  fontFamily: theme.typography.fontFamily,
  fontSize: '14px',
  '&.open': {
    width: '380px',
  },
}));

const StyledSelect = styled(ReactSelect)(({ theme }) => ({
  minWidth: '220px',
  flexGrow: 1,
  '& .react-select__control': {
    background: theme.palette.background.default,
    color: theme.palette.text.primary,
    minHeight: '32px',
    maxHeight: '32px',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '6px',
    boxShadow: 'none',
    '&:hover': {
      borderColor: theme.palette.action.hover,
    },
  },
  '& .react-select__value-container': {
    padding: '0 8px',
  },
  '& .react-select__single-value': {
    color: theme.palette.text.primary,
    marginLeft: 0,
  },
  '& .react-select__menu': {
    background: theme.palette.background.paper,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '6px',
    boxShadow: theme.shadows[4],
    width: '100%',
    minWidth: '180px',
    zIndex: 2,
  },
  '& .react-select__option': {
    background: 'transparent',
    color: theme.palette.text.primary,
    fontSize: '14px',
    padding: '8px 12px',
    '&:hover': {
      background: theme.palette.action.hover,
    },
    '&.react-select__option--is-focused': {
      background: theme.palette.action.hover,
    },
    '&.react-select__option--is-selected': {
      background: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
  },
  '& .react-select__indicator': {
    color: theme.palette.text.secondary,
  },
  '& .react-select__indicator-separator': {
    backgroundColor: theme.palette.divider,
  },
  '& .react-select__placeholder': {
    color: theme.palette.text.disabled,
  },
}));

export default function SidePanel() {
  const { connected, client } = useLiveAPIContext();
  const [open, setOpen] = useState(true);
  const loggerRef = useRef<HTMLDivElement>(null);
  const loggerLastHeightRef = useRef<number>(-1);
  const { log, logs } = useLoggerStore();
  const theme = useTheme();

  const [textInput, setTextInput] = useState("");
  const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);

  useEffect(() => {
    if (loggerRef.current) {
      const el = loggerRef.current;
      const scrollHeight = el.scrollHeight;
      if (scrollHeight !== loggerLastHeightRef.current) {
        el.scrollTop = scrollHeight;
        loggerLastHeightRef.current = scrollHeight;
      }
    }
  }, [logs]);

  useEffect(() => {
    client.on("log", log);
    return () => {
      client.off("log", log);
    };
  }, [client, log]);

  const handleSubmit = () => {
    if (textInput.trim()) {
      client.send([{ text: textInput }]);
      setTextInput("");
    }
  };

  return (
    <StyledSidePanel className={open ? "open" : ""}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: open ? 'space-between' : 'center', 
        alignItems: 'center',
        p: 2,
        borderBottom: `1px solid ${theme.palette.divider}`,
        minHeight: '64px',
      }}>
        {open && (
          <Typography variant="h6" sx={{ 
            color: theme.palette.text.primary,
            fontWeight: 500,
            fontSize: '16px'
          }}>
            Please Take A Look
          </Typography>
        )}
        <IconButton 
          onClick={() => setOpen(!open)}
          sx={{ 
            color: theme.palette.text.secondary,
            '&:hover': {
              color: theme.palette.text.primary,
              background: theme.palette.action.hover
            }
          }}
        >
          {open ? <RiSidebarFoldLine /> : <RiSidebarUnfoldLine />}
        </IconButton>
      </Box>

      {open && (
        <>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column',
            p: 2, 
            gap: 2,
            width: '100%',
          }}>
            <Paper
              sx={{
                px: 1.5,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                bgcolor: theme.palette.background.default,
                color: connected ? theme.palette.success.main : theme.palette.text.disabled,
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: '6px',
                height: '32px',
                boxSizing: 'border-box'
              }}
            >
              <Box sx={{ 
                width: 8, 
                height: 8, 
                borderRadius: '50%', 
                bgcolor: connected ? theme.palette.success.main : theme.palette.text.disabled
              }} />
              <Typography variant="body2" sx={{ fontSize: '14px' }}>
                {connected ? 'Connected' : 'Disconnected'}
              </Typography>
            </Paper>

            <StyledSelect
              className="react-select"
              classNamePrefix="react-select"
              defaultValue={selectedOption}
              options={filterOptions}
              onChange={(newValue: any) => setSelectedOption(newValue)}
            />
          </Box>

          <Box ref={loggerRef} sx={{ 
            flexGrow: 1, 
            overflow: 'auto',
            width: '100%',
            px: 2,
            py: 1,
          }}>
            <Logger
              filter={(selectedOption?.value as LoggerFilterType) || "none"}
            />
          </Box>

          <Paper sx={{ 
            p: 2,
            borderTop: `1px solid ${theme.palette.divider}`,
            bgcolor: 'transparent'
          }}>
            <Box sx={{ 
              display: 'flex',
              gap: 1,
              alignItems: 'center'
            }}>
              <TextField
                fullWidth
                size="small"
                placeholder="Type something..."
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit();
                  }
                }}
                disabled={!connected}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    bgcolor: theme.palette.background.default,
                    borderRadius: '6px',
                    '& fieldset': {
                      borderColor: theme.palette.divider,
                    },
                    '&:hover fieldset': {
                      borderColor: theme.palette.action.hover,
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: theme.palette.primary.main,
                    },
                    input: {
                      color: theme.palette.text.primary,
                      '&::placeholder': {
                        color: theme.palette.text.disabled,
                        opacity: 1,
                      },
                    },
                  },
                }}
              />
              <IconButton 
                onClick={handleSubmit}
                disabled={!connected || !textInput.trim()}
                sx={{
                  color: theme.palette.primary.main,
                  '&:hover': {
                    background: theme.palette.action.hover,
                  },
                  '&.Mui-disabled': {
                    color: theme.palette.text.disabled,
                  }
                }}
              >
                <SendIcon />
              </IconButton>
            </Box>
          </Paper>
        </>
      )}
    </StyledSidePanel>
  );
}
