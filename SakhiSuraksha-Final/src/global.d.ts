interface SpeechRecognitionEvent extends Event {
  readonly results: SpeechRecognitionResultList;
  readonly interpretation?: any;
  readonly emma?: Document;
}
