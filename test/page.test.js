import PageBar from "../src/pagebar";
test.todo("ffff")
describe("ComponentToTest", () => {
    test("renders component correctly", () => {
      render(<PageBar />);
      expect(screen.getByText("Hello, World!")).toBeInTheDocument();
    });
    test("handles click event correctly", () => {
        render(<PageBar />);  });
})
