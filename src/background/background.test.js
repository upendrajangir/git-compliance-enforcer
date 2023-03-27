describe("background.js", () => {
  describe("onMessage", () => {
    it("should respond with a greeting when a greeting message is received", () => {
      const mockSender = {};
      const mockResponse = jest.fn();
      const message = { type: "greeting" };

      chrome.runtime.onMessage.trigger(message, mockSender, mockResponse);

      expect(mockResponse).toHaveBeenCalledWith({ greeting: "Hello, world!" });
    });
  });

  describe("browserAction", () => {
    it("should open a new tab with the Google homepage when clicked", () => {
      const mockTab = { id: 1 };
      const mockCreate = jest.fn();
      jest.spyOn(chrome.tabs, "create").mockImplementationOnce(mockCreate);

      chrome.browserAction.onClicked.trigger(mockTab);

      expect(mockCreate).toHaveBeenCalledWith({
        url: "https://www.google.com",
      });
    });
  });
});
